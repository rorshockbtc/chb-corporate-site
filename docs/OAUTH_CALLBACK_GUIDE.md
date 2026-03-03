# OAuth Callback Implementation Guide for CHB Apps

**Purpose**: This document explains how to integrate with CHB's Universal :-] Authentication system as a client app (like Pipes, Hash, or Semi).

**CHB Auth Server**: `colonhyphenbracket.pink`

---

## Overview

CHB implements OAuth 2.0 with PKCE support. After a user logs in at CHB, they're redirected back to your app with an authorization code. Your app exchanges this code for an access token, then uses that token to fetch user info.

```
┌─────────────┐         ┌─────────────────────────┐         ┌─────────────┐
│  Your App   │ ──1──▶  │  colonhyphenbracket.pink │ ──2──▶  │  Your App   │
│  (Pipes)    │         │   (OAuth Provider)       │         │  /callback  │
│             │         │                          │         │             │
│ Redirect to │         │  User logs in here       │         │ Receives    │
│ /oauth/auth │         │  (email/password or      │         │ ?code=xyz   │
│             │         │   NOSTR)                 │         │             │
└─────────────┘         └─────────────────────────┘         └─────────────┘
                                                                   │
                                                                   │ 3
                                                                   ▼
                                                            ┌─────────────┐
                                                            │ Exchange    │
                                                            │ code for    │
                                                            │ access_token│
                                                            └─────────────┘
                                                                   │
                                                                   │ 4
                                                                   ▼
                                                            ┌─────────────┐
                                                            │ GET /oauth/ │
                                                            │ userinfo    │
                                                            └─────────────┘
```

---

## Step 1: Register Your App as an OAuth Client

Before you can use OAuth, your app needs to be registered with CHB. Contact the CHB admin to get:

- **client_id**: A unique identifier for your app (e.g., `pipes`)
- **client_secret**: A secret key for server-to-server token exchange
- **redirect_uris**: Allowed callback URLs (e.g., `https://pipes.pink/auth/callback`)

The admin will run this on the CHB server:
```typescript
import { registerOAuthClient } from "./oauth-provider";

await registerOAuthClient(
  "pipes",                                    // client_id
  "Pipes - Idea Pipeline Manager",            // name
  ["https://pipes.pink/auth/callback"],       // allowed redirect URIs
  ["openid", "profile", "email"]              // allowed scopes
);
// Returns: { clientId: "pipes", clientSecret: "abc123..." }
```

---

## Step 2: Redirect User to CHB for Login

When the user clicks "Continue with CHB", redirect them to CHB's authorization endpoint:

```typescript
// client/src/lib/chb-auth.ts

const CHB_AUTH_URL = "https://colonhyphenbracket.pink/oauth/authorize";
const CLIENT_ID = "pipes";
const REDIRECT_URI = "https://pipes.pink/auth/callback";

export function redirectToChbLogin(returnPath: string = "/") {
  // Generate a random state to prevent CSRF attacks
  const state = crypto.randomUUID();
  sessionStorage.setItem("oauth_state", state);
  sessionStorage.setItem("oauth_return_path", returnPath);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "openid profile email",
    state: state,
  });

  window.location.href = `${CHB_AUTH_URL}?${params.toString()}`;
}
```

**With PKCE (recommended for extra security):**
```typescript
export async function redirectToChbLoginWithPKCE(returnPath: string = "/") {
  // Generate code verifier and challenge
  const codeVerifier = crypto.randomUUID() + crypto.randomUUID();
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const state = crypto.randomUUID();
  
  sessionStorage.setItem("oauth_state", state);
  sessionStorage.setItem("oauth_code_verifier", codeVerifier);
  sessionStorage.setItem("oauth_return_path", returnPath);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "openid profile email",
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  window.location.href = `${CHB_AUTH_URL}?${params.toString()}`;
}
```

---

## Step 3: Implement the Callback Handler

After the user logs in at CHB, they're redirected to your callback URL with:
- `?code=abc123` - The authorization code
- `?state=xyz` - The state you sent (verify this!)

### Frontend Callback Page

```tsx
// client/src/pages/auth-callback.tsx

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const errorParam = params.get("error");

      if (errorParam) {
        setError(params.get("error_description") || "Authentication failed");
        return;
      }

      // Verify state to prevent CSRF
      const savedState = sessionStorage.getItem("oauth_state");
      if (state !== savedState) {
        setError("Invalid state parameter - possible CSRF attack");
        return;
      }

      if (!code) {
        setError("No authorization code received");
        return;
      }

      try {
        // Get code verifier if using PKCE
        const codeVerifier = sessionStorage.getItem("oauth_code_verifier");

        // Exchange code for token on the server
        const response = await apiRequest("/api/auth/callback", {
          method: "POST",
          body: JSON.stringify({
            code,
            code_verifier: codeVerifier,
          }),
        });

        if (!response.ok) {
          throw new Error("Token exchange failed");
        }

        // Clean up session storage
        sessionStorage.removeItem("oauth_state");
        sessionStorage.removeItem("oauth_code_verifier");
        
        // Redirect to the original path or dashboard
        const returnPath = sessionStorage.getItem("oauth_return_path") || "/dashboard";
        sessionStorage.removeItem("oauth_return_path");
        setLocation(returnPath);
      } catch (err) {
        setError("Failed to complete authentication");
        console.error("Auth callback error:", err);
      }
    }

    handleCallback();
  }, [setLocation]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mt-2 text-gray-600">{error}</p>
        <a href="/signup" className="mt-4 text-pink-500 hover:underline">
          Try again
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}
```

### Backend Callback Handler

```typescript
// server/chb-oauth-client.ts

import { storage } from "./storage";

const CHB_TOKEN_URL = "https://colonhyphenbracket.pink/oauth/token";
const CHB_USERINFO_URL = "https://colonhyphenbracket.pink/oauth/userinfo";
const CLIENT_ID = process.env.CHB_CLIENT_ID || "pipes";
const CLIENT_SECRET = process.env.CHB_CLIENT_SECRET!;
const REDIRECT_URI = process.env.CHB_REDIRECT_URI || "https://pipes.pink/auth/callback";

export async function exchangeCodeForToken(
  code: string,
  codeVerifier?: string
): Promise<{ access_token: string; expires_in: number } | null> {
  try {
    const body: Record<string, string> = {
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    };

    if (codeVerifier) {
      body.code_verifier = codeVerifier;
    }

    const response = await fetch(CHB_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Token exchange failed:", error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Token exchange error:", error);
    return null;
  }
}

export async function fetchUserInfo(accessToken: string): Promise<{
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
} | null> {
  try {
    const response = await fetch(CHB_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error("Userinfo fetch failed:", response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Userinfo fetch error:", error);
    return null;
  }
}
```

### Register the Route

```typescript
// In server/routes.ts

import { exchangeCodeForToken, fetchUserInfo } from "./chb-oauth-client";

// Add this route:
app.post("/api/auth/callback", async (req, res) => {
  try {
    const { code, code_verifier } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Missing authorization code" });
    }

    // Exchange code for access token
    const tokenData = await exchangeCodeForToken(code, code_verifier);
    if (!tokenData) {
      return res.status(400).json({ error: "Token exchange failed" });
    }

    // Fetch user info from CHB
    const userInfo = await fetchUserInfo(tokenData.access_token);
    if (!userInfo) {
      return res.status(400).json({ error: "Failed to fetch user info" });
    }

    // Find or create local user
    let user = await storage.getUserByEmail(userInfo.email!);
    
    if (!user) {
      // Create new user from CHB data
      user = await storage.createUser({
        email: userInfo.email!,
        firstName: userInfo.given_name || null,
        lastName: userInfo.family_name || null,
        profileImageUrl: userInfo.picture || null,
        emailVerified: userInfo.email_verified || false,
        chbUserId: userInfo.sub, // Store CHB user ID for future reference
      });
    }

    // Create local session
    (req.session as any).userId = user.id;

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Auth callback error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});
```

---

## Step 4: Add the Route to App.tsx

```tsx
// client/src/App.tsx

import AuthCallback from "@/pages/auth-callback";

// In your router:
<Route path="/auth/callback" component={AuthCallback} />
```

---

## Environment Variables

Add these to your Pipes `.env`:

```bash
CHB_CLIENT_ID=pipes
CHB_CLIENT_SECRET=your-client-secret-from-chb-admin
CHB_REDIRECT_URI=https://pipes.pink/auth/callback
```

---

## Testing Locally

For local development, register a localhost redirect URI:

```typescript
// On CHB server
await registerOAuthClient(
  "pipes-dev",
  "Pipes (Development)",
  [
    "https://pipes.pink/auth/callback",
    "http://localhost:5000/auth/callback"  // Local testing
  ],
  ["openid", "profile", "email"]
);
```

Then use `pipes-dev` as your client_id locally.

---

## Security Best Practices

1. **Always validate the `state` parameter** to prevent CSRF attacks
2. **Use PKCE** for public clients (SPAs without a backend secret)
3. **Store client_secret securely** in environment variables
4. **Use HTTPS** in production for all OAuth endpoints
5. **Set short token expiry** and implement refresh tokens if needed

---

## Endpoints Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `https://colonhyphenbracket.pink/oauth/authorize` | GET | Start OAuth flow - redirects to login |
| `https://colonhyphenbracket.pink/oauth/token` | POST | Exchange code for access token |
| `https://colonhyphenbracket.pink/oauth/userinfo` | GET | Get user info with access token |

---

## Troubleshooting

**"Invalid redirect_uri for this client"**
- Make sure your redirect URI exactly matches what's registered

**"Authorization code has expired"**
- Codes expire after 10 minutes - user took too long

**"Invalid client credentials"**
- Check your client_secret is correct

**"Invalid code verifier"**
- PKCE challenge/verifier mismatch - regenerate both

---

## Next Steps

1. Ask CHB admin to register your app as an OAuth client
2. Implement the callback handler in your app
3. Add the "Continue with CHB" button to your login/signup page
4. Test the full flow locally before deploying
