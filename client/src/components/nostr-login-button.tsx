import { useState } from "react";
import { useNostrAuth } from "@/hooks/use-nostr-auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Key, LogOut, Shield, User, ExternalLink, Loader2 } from "lucide-react";
import { shortenNpub } from "@/lib/nostr";

export function NostrLoginButton() {
  const {
    isLoading,
    isAuthenticated,
    hasExtension,
    user,
    login,
    logout,
    setPin,
    verifyPin
  } = useNostrAuth();
  
  const { toast } = useToast();
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [pin, setPin_] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [isPinLoading, setIsPinLoading] = useState(false);

  const handleLogin = async () => {
    if (!hasExtension) {
      toast({
        title: "NOSTR Extension Required",
        description: "Please install Alby or another NIP-07 compatible browser extension to login.",
        variant: "destructive"
      });
      return;
    }

    const success = await login();
    if (success) {
      toast({
        title: "Welcome! :-]",
        description: "Successfully logged in with NOSTR"
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Could not complete NOSTR authentication. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
  };

  const handleSetPin = async () => {
    if (pin.length < 4 || pin.length > 6) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be 4-6 digits",
        variant: "destructive"
      });
      return;
    }

    if (pin !== confirmPin) {
      toast({
        title: "PINs Don't Match",
        description: "Please make sure both PINs match",
        variant: "destructive"
      });
      return;
    }

    setIsPinLoading(true);
    const success = await setPin(pin);
    setIsPinLoading(false);

    if (success) {
      toast({
        title: "PIN Set",
        description: "Your PIN has been set successfully"
      });
      setShowPinDialog(false);
      setPin_("");
      setConfirmPin("");
    } else {
      toast({
        title: "Failed to Set PIN",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <Button variant="outline" disabled className="gap-2" data-testid="nostr-login-loading">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button 
        onClick={handleLogin} 
        variant="outline" 
        className="gap-2"
        disabled={!hasExtension}
        data-testid="nostr-login-button"
      >
        <Key className="h-4 w-4" />
        {hasExtension ? "Login with NOSTR" : "Install Alby"}
        {!hasExtension && (
          <ExternalLink className="h-3 w-3" />
        )}
      </Button>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2" data-testid="nostr-user-menu">
            <User className="h-4 w-4" />
            {user?.npub ? shortenNpub(user.npub) : "Connected"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">Connected via NOSTR</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.npub}
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => setShowPinDialog(true)}
            data-testid="set-pin-button"
          >
            <Shield className="mr-2 h-4 w-4" />
            {user?.hasPin ? "Change PIN" : "Set PIN"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleLogout}
            className="text-red-600"
            data-testid="logout-button"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {user?.hasPin ? "Change PIN" : "Set Security PIN"}
            </DialogTitle>
            <DialogDescription>
              Add an extra layer of security with a 4-6 digit PIN. This will be required for sensitive actions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="pin">PIN (4-6 digits)</Label>
              <Input
                id="pin"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin_(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter PIN"
                data-testid="pin-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-pin">Confirm PIN</Label>
              <Input
                id="confirm-pin"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                placeholder="Confirm PIN"
                data-testid="confirm-pin-input"
              />
            </div>
            <Button 
              onClick={handleSetPin} 
              disabled={isPinLoading || pin.length < 4}
              className="w-full"
              data-testid="submit-pin-button"
            >
              {isPinLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting PIN...
                </>
              ) : (
                "Set PIN"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
