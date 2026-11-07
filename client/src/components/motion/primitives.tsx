import { motion, useReducedMotion, useInView, type HTMLMotionProps } from "framer-motion";
import { type ReactNode, useRef } from "react";
import {
  DURATION,
  EASE_ACCENT,
  EASE_EDITORIAL,
  EDITORIAL_DURATION,
  SPRING_LAYOUT,
  TAP,
  CARD_HOVER,
  CARD_TAP,
  RISE,
} from "@/lib/motion/tokens";
import { RiseLines, FadeUp, Eyebrow } from "@/components/brand/motion";
import { Smile } from "@/components/brand/smile";
import {
  ScaryHeadline,
  HOME_SCARY_PAIRS,
  STUDIO_SCARY_PAIRS,
  MANIFESTO_SCARY_PAIRS,
  type ScaryPair,
} from "@/components/brand/scary-words";

export {
  DURATION,
  EASE_ACCENT,
  EASE_EDITORIAL,
  EDITORIAL_DURATION,
  SPRING_LAYOUT,
  TAP,
  CARD_HOVER,
  CARD_TAP,
  RISE,
  RiseLines,
  FadeUp,
  Eyebrow,
  Smile,
  ScaryHeadline,
  HOME_SCARY_PAIRS,
  STUDIO_SCARY_PAIRS,
  MANIFESTO_SCARY_PAIRS,
  type ScaryPair,
};

// --------------------------------------------------------------------------
// Editorial Word-by-Word Reveal
// --------------------------------------------------------------------------
export interface AccentRevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  italicWords?: number[];
  immediate?: boolean;
}

export function AccentRevealText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = EDITORIAL_DURATION.staggerWord,
  italicWords = [],
  immediate = false,
}: AccentRevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const shouldReduce = useReducedMotion();
  const show = immediate || inView;
  const words = text.split(" ");

  const MotionTag = motion[Tag] as any;

  return (
    <MotionTag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
        >
          <motion.span
            className={`inline-block ${italicWords.includes(i) ? "italic" : ""}`}
            initial={shouldReduce ? { opacity: 0 } : { y: "105%" }}
            animate={show ? (shouldReduce ? { opacity: 1 } : { y: "0%" }) : undefined}
            transition={{
              duration: shouldReduce ? 0.2 : EDITORIAL_DURATION.reveal,
              ease: EASE_EDITORIAL,
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

// --------------------------------------------------------------------------
// Curtain Wipe Image Reveal
// --------------------------------------------------------------------------
export interface AccentRevealImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
}

export function AccentRevealImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  delay = 0,
}: AccentRevealImageProps) {
  const shouldReduce = useReducedMotion();

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.div
        initial={
          shouldReduce
            ? { opacity: 0 }
            : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }
        }
        whileInView={
          shouldReduce
            ? { opacity: 1 }
            : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
        }
        viewport={{ once: true, margin: "-6% 0px" }}
        transition={{
          duration: shouldReduce ? 0.2 : EDITORIAL_DURATION.reveal,
          ease: EASE_EDITORIAL,
          delay,
        }}
        className="w-full h-full"
      >
        <motion.img
          src={src}
          alt={alt}
          initial={shouldReduce ? { scale: 1 } : { scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: shouldReduce ? 0.2 : 1.1,
            ease: EASE_EDITORIAL,
            delay,
          }}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      </motion.div>
    </div>
  );
}

// --------------------------------------------------------------------------
// Kinetic 3-Bar Badge
// --------------------------------------------------------------------------
export function AccentKineticBadge({
  label,
  className = "",
  barColor = "bg-[#FE299E]",
}: {
  label: string;
  className?: string;
  barColor?: string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex items-center gap-[3px] h-3.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={shouldReduce ? { scaleY: 1 } : { scaleY: 0.3, opacity: 0.4 }}
            animate={
              shouldReduce
                ? { scaleY: 1, opacity: 1 }
                : {
                    scaleY: [0.3, 1, 0.7, 1],
                    opacity: [0.4, 1, 0.8, 1],
                  }
            }
            transition={{
              duration: 0.8,
              delay: i * 0.12,
              ease: EASE_ACCENT,
            }}
            className={`w-[2px] h-3.5 ${barColor} origin-bottom rounded-[0.5px]`}
          />
        ))}
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.14em] font-bold">
        {label}
      </span>
    </div>
  );
}

// --------------------------------------------------------------------------
// Editorial Viewport Reveal
// --------------------------------------------------------------------------
export function AccentEditorialReveal({
  children,
  className = "",
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{
        duration: shouldReduce ? 0.2 : EDITORIAL_DURATION.fadeIn,
        ease: EASE_EDITORIAL,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --------------------------------------------------------------------------
// Stagger Container & Items
// --------------------------------------------------------------------------
interface StaggerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
}

export function Stagger({
  children,
  staggerChildren = 0.06,
  delayChildren = 0.02,
  className,
  ...rest
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-6% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  y?: number;
  className?: string;
}

export function StaggerItem({
  children,
  y = 16,
  className,
  ...rest
}: StaggerItemProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: shouldReduce ? { opacity: 0 } : { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: shouldReduce ? 0.2 : 0.65,
            ease: EASE_EDITORIAL,
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// --------------------------------------------------------------------------
// Hairline Line Expansion
// --------------------------------------------------------------------------
export function Hairline({
  className = "bg-[#D3C7B5]",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { scaleX: 0 }}
      whileInView={shouldReduce ? { opacity: 1 } : { scaleX: 1 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{
        duration: shouldReduce ? 0.2 : 0.85,
        delay,
        ease: EASE_EDITORIAL,
      }}
      style={{ transformOrigin: "left center" }}
      className={`h-px w-full ${className}`}
    />
  );
}
