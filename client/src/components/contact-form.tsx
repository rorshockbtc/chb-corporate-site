import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

type Variant = "full" | "compact";

interface ContactFormProps {
  variant?: Variant;
  subjectPrefix?: string;
  className?: string;
  testIdPrefix?: string;
}

export function ContactForm({
  variant = "full",
  subjectPrefix = "CHB Site",
  className = "",
  testIdPrefix = "contact",
}: ContactFormProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ACCESS_KEY) {
      toast({
        title: "Form not configured",
        description: "The contact form is missing its access key.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", `${subjectPrefix} — ${formData.get("name") || "New message"}`);
    formData.append("from_name", "colonhyphenbracket.pink");
    formData.append("botcheck", ""); // honeypot

    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        (e.target as HTMLFormElement).reset();
        toast({
          title: "Message sent :-]",
          description: "We'll get back to you soon.",
        });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err: any) {
      toast({
        title: "Couldn't send message",
        description: err?.message || "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className={`flex items-center gap-3 rounded-2xl border border-brand-pink/30 bg-brand-pink/5 p-6 ${className}`}>
        <CheckCircle2 className="h-6 w-6 text-brand-pink flex-shrink-0" />
        <div>
          <p className="font-semibold text-foreground">Thanks — message received :-]</p>
          <p className="text-sm text-muted-foreground">We read every note. Expect a reply soon.</p>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`space-y-3 ${className}`} data-testid={`${testIdPrefix}-form-compact`}>
        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
        <div className="grid sm:grid-cols-2 gap-3">
          <Input
            name="name"
            placeholder="Your name"
            required
            className="bg-background"
            data-testid={`${testIdPrefix}-input-name`}
          />
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="bg-background"
            data-testid={`${testIdPrefix}-input-email`}
          />
        </div>
        <Textarea
          name="message"
          placeholder="What's on your mind?"
          required
          rows={3}
          className="bg-background resize-none"
          data-testid={`${testIdPrefix}-input-message`}
        />
        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white"
          data-testid={`${testIdPrefix}-submit`}
        >
          {submitting ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending…</>
          ) : (
            <><Send className="h-4 w-4 mr-2" /> Send message</>
          )}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`} data-testid={`${testIdPrefix}-form`}>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor={`${testIdPrefix}-name`}>Name</Label>
          <Input
            id={`${testIdPrefix}-name`}
            name="name"
            placeholder="Your name"
            required
            data-testid={`${testIdPrefix}-input-name`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${testIdPrefix}-email`}>Email</Label>
          <Input
            id={`${testIdPrefix}-email`}
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            data-testid={`${testIdPrefix}-input-email`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${testIdPrefix}-company`}>Company / Project (optional)</Label>
        <Input
          id={`${testIdPrefix}-company`}
          name="company"
          placeholder="Where are you writing from?"
          data-testid={`${testIdPrefix}-input-company`}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${testIdPrefix}-message`}>Message</Label>
        <Textarea
          id={`${testIdPrefix}-message`}
          name="message"
          placeholder="Tell us what you're working on or what you need."
          required
          rows={6}
          className="resize-none"
          data-testid={`${testIdPrefix}-input-message`}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="bg-brand-pink hover:bg-brand-pink/90 text-white px-8"
        data-testid={`${testIdPrefix}-submit`}
      >
        {submitting ? (
          <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Sending…</>
        ) : (
          <><Send className="h-5 w-5 mr-2" /> Send message</>
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        We never share your email. Powered by Web3Forms.
      </p>
    </form>
  );
}
