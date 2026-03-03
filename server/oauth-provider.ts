import crypto from "crypto";
import type { Express, Request, Response } from "express";
import { storage } from "./storage";

const CODE_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 1 week

function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString("hex");
}

function validateRedirectUri(client: { redirectUris: string[] }, redirectUri: string): boolean {
  return client.redirectUris.some(uri => {
    if (uri === redirectUri) return true;
    if (uri.endsWith("*")) {
      const prefix = uri.slice(0, -1);
      return redirectUri.startsWith(prefix);
    }
    return false;
  });
}

export async function setupOAuthProvider(app: Express) {
  app.get("/oauth/authorize", async (req: Request, res: Response) => {
    try {
      const {
        client_id,
        redirect_uri,
        response_type,
        scope,
        state,
        code_challenge,
        code_challenge_method,
      } = req.query;

      if (!client_id || !redirect_uri || response_type !== "code") {
        return res.status(400).json({
          error: "invalid_request",
          error_description: "Missing required parameters: client_id, redirect_uri, response_type=code",
        });
      }

      const client = await storage.getOAuthClient(client_id as string);
      if (!client || !client.isActive) {
        return res.status(400).json({
          error: "invalid_client",
          error_description: "Unknown or inactive client",
        });
      }

      if (!validateRedirectUri(client, redirect_uri as string)) {
        return res.status(400).json({
          error: "invalid_request",
          error_description: "Invalid redirect_uri for this client",
        });
      }

      const userId = (req.session as any)?.userId;
      if (!userId) {
        const loginUrl = `/signup?` + new URLSearchParams({
          oauth: "true",
          client_id: client_id as string,
          redirect_uri: redirect_uri as string,
          response_type: response_type as string,
          scope: (scope as string) || "openid profile email",
          state: (state as string) || "",
          code_challenge: (code_challenge as string) || "",
          code_challenge_method: (code_challenge_method as string) || "",
        }).toString();
        
        return res.redirect(loginUrl);
      }

      const code = generateSecureToken();
      const expiresAt = new Date(Date.now() + CODE_EXPIRY_MS);

      await storage.createAuthorizationCode({
        code,
        clientId: client_id as string,
        userId,
        redirectUri: redirect_uri as string,
        scope: (scope as string) || "openid profile email",
        codeChallenge: code_challenge as string | undefined,
        codeChallengeMethod: code_challenge_method as string | undefined,
        expiresAt,
      });

      const callbackUrl = new URL(redirect_uri as string);
      callbackUrl.searchParams.set("code", code);
      if (state) {
        callbackUrl.searchParams.set("state", state as string);
      }

      res.redirect(callbackUrl.toString());
    } catch (error) {
      console.error("OAuth authorize error:", error);
      res.status(500).json({
        error: "server_error",
        error_description: "Internal server error",
      });
    }
  });

  app.post("/oauth/token", async (req: Request, res: Response) => {
    try {
      const { grant_type, code, redirect_uri, client_id, client_secret, code_verifier } = req.body;

      if (grant_type !== "authorization_code") {
        return res.status(400).json({
          error: "unsupported_grant_type",
          error_description: "Only authorization_code grant type is supported",
        });
      }

      if (!code || !redirect_uri || !client_id) {
        return res.status(400).json({
          error: "invalid_request",
          error_description: "Missing required parameters: code, redirect_uri, client_id",
        });
      }

      const client = await storage.getOAuthClient(client_id);
      if (!client || !client.isActive) {
        return res.status(400).json({
          error: "invalid_client",
          error_description: "Unknown or inactive client",
        });
      }

      const authCode = await storage.getAuthorizationCode(code);
      if (!authCode) {
        return res.status(400).json({
          error: "invalid_grant",
          error_description: "Invalid authorization code",
        });
      }

      if (authCode.usedAt) {
        return res.status(400).json({
          error: "invalid_grant",
          error_description: "Authorization code has already been used",
        });
      }

      if (new Date() > authCode.expiresAt) {
        return res.status(400).json({
          error: "invalid_grant",
          error_description: "Authorization code has expired",
        });
      }

      if (authCode.redirectUri !== redirect_uri) {
        return res.status(400).json({
          error: "invalid_grant",
          error_description: "Redirect URI mismatch",
        });
      }

      if (authCode.clientId !== client_id) {
        return res.status(400).json({
          error: "invalid_grant",
          error_description: "Client ID mismatch",
        });
      }

      if (authCode.codeChallenge) {
        if (!code_verifier) {
          return res.status(400).json({
            error: "invalid_grant",
            error_description: "Code verifier required for PKCE",
          });
        }

        let computedChallenge: string;
        if (authCode.codeChallengeMethod === "S256") {
          computedChallenge = crypto
            .createHash("sha256")
            .update(code_verifier)
            .digest("base64url");
        } else {
          computedChallenge = code_verifier;
        }

        if (computedChallenge !== authCode.codeChallenge) {
          return res.status(400).json({
            error: "invalid_grant",
            error_description: "Invalid code verifier",
          });
        }
      } else {
        if (client.clientSecret !== client_secret) {
          return res.status(401).json({
            error: "invalid_client",
            error_description: "Invalid client credentials",
          });
        }
      }

      await storage.markAuthorizationCodeUsed(code);

      const accessToken = generateSecureToken();
      const tokenExpiresAt = new Date(Date.now() + TOKEN_EXPIRY_MS);

      await storage.createAccessToken({
        token: accessToken,
        clientId: client_id,
        userId: authCode.userId,
        scope: authCode.scope || undefined,
        expiresAt: tokenExpiresAt,
      });

      res.json({
        access_token: accessToken,
        token_type: "Bearer",
        expires_in: Math.floor(TOKEN_EXPIRY_MS / 1000),
        scope: authCode.scope,
      });
    } catch (error) {
      console.error("OAuth token error:", error);
      res.status(500).json({
        error: "server_error",
        error_description: "Internal server error",
      });
    }
  });

  app.get("/oauth/userinfo", async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          error: "invalid_token",
          error_description: "Missing or invalid Authorization header",
        });
      }

      const token = authHeader.slice(7);
      const accessToken = await storage.getAccessToken(token);

      if (!accessToken) {
        return res.status(401).json({
          error: "invalid_token",
          error_description: "Invalid access token",
        });
      }

      if (new Date() > accessToken.expiresAt) {
        return res.status(401).json({
          error: "invalid_token",
          error_description: "Access token has expired",
        });
      }

      const user = await storage.getUser(accessToken.userId);
      if (!user) {
        return res.status(401).json({
          error: "invalid_token",
          error_description: "User not found",
        });
      }

      const scopes = (accessToken.scope || "").split(" ");
      const userInfo: Record<string, any> = {
        sub: user.id,
      };

      if (scopes.includes("profile") || scopes.includes("openid")) {
        userInfo.name = [user.firstName, user.lastName].filter(Boolean).join(" ") || undefined;
        userInfo.given_name = user.firstName || undefined;
        userInfo.family_name = user.lastName || undefined;
        userInfo.picture = user.profileImageUrl || undefined;
      }

      if (scopes.includes("email") || scopes.includes("openid")) {
        userInfo.email = user.email || undefined;
        userInfo.email_verified = user.emailVerified || false;
      }

      res.json(userInfo);
    } catch (error) {
      console.error("OAuth userinfo error:", error);
      res.status(500).json({
        error: "server_error",
        error_description: "Internal server error",
      });
    }
  });

  app.post("/oauth/authorize/complete", async (req: Request, res: Response) => {
    try {
      const userId = (req.session as any)?.userId;
      if (!userId) {
        return res.status(401).json({
          error: "unauthorized",
          error_description: "User not authenticated",
        });
      }

      const { client_id, redirect_uri, scope, state, code_challenge, code_challenge_method } = req.body;

      if (!client_id || !redirect_uri) {
        return res.status(400).json({
          error: "invalid_request",
          error_description: "Missing required parameters",
        });
      }

      const client = await storage.getOAuthClient(client_id);
      if (!client || !client.isActive) {
        return res.status(400).json({
          error: "invalid_client",
          error_description: "Unknown or inactive client",
        });
      }

      if (!validateRedirectUri(client, redirect_uri)) {
        return res.status(400).json({
          error: "invalid_request",
          error_description: "Invalid redirect_uri for this client",
        });
      }

      const code = generateSecureToken();
      const expiresAt = new Date(Date.now() + CODE_EXPIRY_MS);

      await storage.createAuthorizationCode({
        code,
        clientId: client_id,
        userId,
        redirectUri: redirect_uri,
        scope: scope || "openid profile email",
        codeChallenge: code_challenge || undefined,
        codeChallengeMethod: code_challenge_method || undefined,
        expiresAt,
      });

      const callbackUrl = new URL(redirect_uri);
      callbackUrl.searchParams.set("code", code);
      if (state) {
        callbackUrl.searchParams.set("state", state);
      }

      res.json({
        redirect_uri: callbackUrl.toString(),
      });
    } catch (error) {
      console.error("OAuth authorize complete error:", error);
      res.status(500).json({
        error: "server_error",
        error_description: "Internal server error",
      });
    }
  });

  setInterval(async () => {
    try {
      await storage.cleanupExpiredTokens();
    } catch (error) {
      console.error("Token cleanup error:", error);
    }
  }, 60 * 60 * 1000);
}

export async function registerOAuthClient(
  clientId: string,
  name: string,
  redirectUris: string[],
  scopes: string[] = ["openid", "profile", "email"]
): Promise<{ clientId: string; clientSecret: string }> {
  const clientSecret = generateSecureToken();
  
  await storage.createOAuthClient({
    clientId,
    clientSecret,
    name,
    redirectUris,
    allowedScopes: scopes,
    isActive: true,
  });

  return { clientId, clientSecret };
}
