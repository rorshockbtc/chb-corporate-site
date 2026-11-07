import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { RiseLines, FadeUp } from "@/components/brand/motion";

const KINDS = [
  { id: "sprint", label: "A one-week sprint", color: "#0A9BE0" },
  { id: "partner", label: "An ongoing partner", color: "#FE299E" },
  { id: "build", label: "A full build", color: "#3FA535" },
  { id: "hello", label: "Just saying hi", color: "#111827" },
];

const field =
  "w-full bg-transparent border-0 border-b-2 border-[#111827]/15 focus:border-[#FE299E] focus:outline-none focus:ring-0 py-4 font-display text-2xl sm:text-3xl font-semibold text-[#111827] placeholder:text-[#111827]/25 transition-colors";

export default function Contact() {
  const [kind, setKind] = useState("sprint");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get("name") || "").trim();
    const email = String(d.get("email") || "").trim();
    const message = String(d.get("message") || "").trim();
    if (!name || !email || !message) return;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, message,
          company: String(d.get("company") || "").trim(),
          subject: `CHB Start a project (${KINDS.find((k) => k.id === kind)?.label}) — ${name}`,
        }),
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
      <section className="pt-32 sm:pt-40 pb-28 sm:pb-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <h1 className="font-display font-bold text-huge">
              <RiseLines immediate lines={["Bring us", "something", <span key="s" className="text-[#FE299E]">scary.</span>]} />
            </h1>
            <FadeUp delay={0.3}>
              <p className="mt-10 text-xl leading-relaxed text-[#111827]/75 max-w-[34ch]">
                Tell us what's keeping you up at night. A real human (Kyle) reads every note and replies personally,
                usually within a day.
              </p>
              <a href="mailto:cubby@colonhyphenbracket.pink" className="link-swipe inline-block mt-8 text-xl font-semibold text-[#111827] no-underline">
                cubby@colonhyphenbracket.pink
              </a>
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {state === "sent" ? (
                <motion.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-6">
                  <Smile className="text-[140px]" color="#FE299E" winkEvery={1600} />
                  <h2 className="font-display text-big font-bold mt-8">Got it. That already feels less scary.</h2>
                  <p className="mt-6 text-xl text-[#111827]/70">Expect a reply soon.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="space-y-10" data-testid="contact-page-form" exit={{ opacity: 0, y: -12 }}>
                  <div>
                    <div className="font-display text-xl font-bold text-[#111827] mb-4">I'm looking for</div>
                    <div className="flex flex-wrap gap-3">
                      {KINDS.map((k) => (
                        <button type="button" key={k.id} onClick={() => setKind(k.id)}
                          className="px-5 py-3 rounded-full border-2 text-lg font-semibold transition-colors cursor-pointer"
                          style={kind === k.id
                            ? { backgroundColor: k.color, borderColor: k.color, color: "#fff" }
                            : { backgroundColor: "transparent", borderColor: "rgba(17,24,39,0.15)", color: "#111827" }}>
                          {k.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
                    <input name="name" required placeholder="Your name" className={field} data-testid="contact-page-input-name" />
                    <input name="email" type="email" required placeholder="Email" className={field} data-testid="contact-page-input-email" />
                  </div>
                  <input name="company" placeholder="Company or project (optional)" className={field} />
                  <textarea name="message" required rows={4} placeholder="What's the scary thing?" className={`${field} resize-none`} data-testid="contact-page-input-message" />
                  {state === "error" && <p className="text-lg text-[#D9264A]">{error}. You can always email us directly.</p>}
                  <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} type="submit" disabled={state === "sending"}
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FE299E] text-white text-lg font-semibold cursor-pointer disabled:opacity-60"
                    data-testid="contact-page-submit">
                    {state === "sending" ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</> : <>Send it <ArrowRight className="w-5 h-5" /></>}
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
