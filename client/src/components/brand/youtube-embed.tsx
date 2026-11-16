import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

/**
 * Privacy-first click-to-load YouTube facade (`youtube-nocookie.com`).
 * Defers third-party iframe scripts until user interaction while preserving a 16:9 poster frame.
 */
export function YouTubeEmbed({ videoId, title, className = "" }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
  );

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl border border-[#111827]/12 bg-[#111827] shadow-sm ${className}`}
      data-testid={`youtube-embed-${videoId}`}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group relative flex h-full w-full cursor-pointer items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FE299E] focus-visible:ring-offset-2"
        >
          <img
            src={thumbSrc}
            alt={title}
            loading="lazy"
            onError={() => {
              const fallback = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
              if (thumbSrc !== fallback) setThumbSrc(fallback);
            }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#111827]/25 transition-colors duration-300 group-hover:bg-[#111827]/35"
          />
          <span className="relative z-10 inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#FE299E] text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-[#111827]">
            <Play className="h-7 w-7 sm:h-8 sm:w-8 fill-current translate-x-0.5" aria-hidden="true" />
          </span>
          <span className="sr-only">Play {title}</span>
        </button>
      )}
    </div>
  );
}
