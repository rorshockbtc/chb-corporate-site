import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { RiseLines, FadeUp } from "@/components/brand/motion";
import { Seo } from "@/components/brand/seo";

const KINDS = [
  { id: "sprint", label: "A one-week sprint ($7.5k)", color: "#0A9BE0" },
  { id: "day", label: "A single-day build or sprint", color: "#3FA535" },
  { id: "partner", label: "An ongoing partner (starts $15k/mo)", color: "#FE299E" },
  { id: "build", label: "A custom build", color: "#0A9BE0" },
  { id: "products", label: "Questions about your products", color: "#3FA535" },
  { id: "hello", label: "Just saying hi", color: "#111827" },
];

const field =
  "w-full bg-transparent border-0 border-b-2 border-[#111827]/15 focus:border-[#FE299E] focus:outline-none focus:ring-0 py-3.5 sm:py-4 font-display text-xl sm:text-3xl font-semibold text-[#111827] placeholder:text-[#111827]/25 transition-colors";

const ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ||
  "0a997a5d-fccb-46f4-bc7b-7df7ec33d90d";

export default function Contact() {
  const [kind, setKind] = useState("sprint");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get("name") || "").trim();
    const email = String(d.get("email") || "").trim();
    const company = String(d.get("company") || "").trim();
    const message = String(d.get("message") || "").trim();
    if (!name || !email || !message) return;

    setState("sending");
    setError("");

    try {
      const selectedKind = KINDS.find((k) => k.id === kind)?.label || kind;
      const formattedMessage = [
        `Looking for: ${selectedKind}`,
        company ? `Company / Project: ${company}` : null,
        "",
        "Message:",
        message,
      ]
        .filter((line) => line !== null)
        .join("\n");

      const payload = {
        access_key: ACCESS_KEY,
        name,
        email,
        subject: `CHB Start a project (${selectedKind}) — ${name}`,
        from_name: "colonhyphenbracket.pink",
        message: formattedMessage,
        // Standard fields Web3Forms parses automatically
        "Project Type": selectedKind,
        ...(company ? { Company: company } : {}),
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const r = (await res.json()) as { success: boolean; message?: string };
      if (!r.success) throw new Error(r.message || "Something went wrong");
      setState("sent");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      setState("error");
    }
  }

  return (
    <div className="brand-canvas min-h-screen">
      <Seo
        title="Start a Project | Colon Hyphen Bracket : - ] — Principal Design & Architecture"
        description="Book a one-week sprint ($7,500), single-day build, or embedded principal partner with Kyle Cyree at Colon Hyphen Bracket."
        path="/contact"
        image="/images/og/og-contact.jpg"
      />

      <section className="pt-28 sm:pt-40 pb-24 sm:pb-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-12 sm:gap-14">
          <div className="lg:col-span-5">
            <h1 className="font-display font-bold text-huge">
              <RiseLines
                immediate
                lines={[
                  "Let's build",
                  "something",
                  <span key="s" className="text-[#FE299E]">
                    worth smiling about.
                  </span>,
                ]}
              />
            </h1>
            <FadeUp delay={0.3}>
              <p className="mt-8 sm:mt-10 text-lg sm:text-xl leading-relaxed text-[#111827]/75 max-w-[36ch]">
                Whether you need a one-week sprint, a single-day build, an embedded partner, or have questions about our tools—I read every note and reply personally, usually within a day.
              </p>

              <div className="mt-6 sm:mt-7 p-5 rounded-2xl bg-[#F3EEE6] border border-[#111827]/10 max-w-[38ch]">
                <div className="font-display text-base sm:text-lg font-bold text-[#111827] flex items-center gap-2">
                  <span className="text-[#FE299E]">: - ]</span> Kyle or Cubby?
                </div>
                <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-[#111827]/75">
                  My real name is <strong>Kyle Cyree</strong>, though most people know me professionally by my nickname, <strong>Cubby</strong>. Either way, you&apos;re talking to the exact same person.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 space-y-3">
                <a
                  href="mailto:cubby@colonhyphenbracket.pink"
                  className="link-swipe inline-block text-lg sm:text-xl font-semibold text-[#111827] no-underline"
                >
                  cubby@colonhyphenbracket.pink
                </a>
                <p className="text-base text-[#111827]/55">
                  Happy to sign an NDA before you share sensitive product details.
                </p>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {state === "sent" ? (
                <motion.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-6">
                  <Smile className="text-[120px] sm:text-[140px]" color="#FE299E" winkEvery={1600} />
                  <h2 className="font-display text-big font-bold mt-8">Got it. That already feels less scary.</h2>
                  <p className="mt-6 text-xl text-[#111827]/70">Expect a personal reply soon : - ]</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  className="space-y-8 sm:space-y-10"
                  data-testid="contact-page-form"
                  exit={{ opacity: 0, y: -12 }}
                >
                  <div>
                    <div className="font-display text-xl font-bold text-[#111827] mb-4">I'm looking for</div>
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                      {KINDS.map((k) => (
                        <button
                          type="button"
                          key={k.id}
                          onClick={() => setKind(k.id)}
                          className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border-2 text-sm sm:text-lg font-semibold transition-colors cursor-pointer"
                          style={
                            kind === k.id
                              ? { backgroundColor: k.color, borderColor: k.color, color: "#fff" }
                              : { backgroundColor: "transparent", borderColor: "rgba(17,24,39,0.15)", color: "#111827" }
                          }
                        >
                          {k.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-10">
                    <input name="name" required placeholder="Your name" className={field} data-testid="contact-page-input-name" />
                    <input name="email" type="email" required placeholder="Email" className={field} data-testid="contact-page-input-email" />
                  </div>
                  <input name="company" placeholder="Company or project (optional)" className={field} />
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us what you're working on or what you need..."
                    className={`${field} resize-none`}
                    data-testid="contact-page-input-message"
                  />
                  {state === "error" && (
                    <p className="text-lg text-[#D9264A]">{error}. You can always email us directly.</p>
                  )}
                  <motion.button
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={state === "sending"}
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FE299E] text-white text-lg font-semibold cursor-pointer disabled:opacity-60"
                    data-testid="contact-page-submit"
                  >
                    {state === "sending" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send note <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
