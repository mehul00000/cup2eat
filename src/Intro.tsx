import { useCallback, useEffect, useRef, useState } from "react";

import { asset } from "./data";

/**
 * Cinematic intro. Plays the brand film on every page load (including
 * reloads), then automatically reveals the website. A Skip button and
 * a hard timeout guarantee no visitor is ever trapped behind it.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setLeaving(true);
    window.setTimeout(onDone, 700); // let the fade-out breathe
  }, [onDone]);

  // Safety net: never trap a visitor if the video stalls or onEnded misfires.
  useEffect(() => {
    const t = window.setTimeout(finish, 30000);
    return () => window.clearTimeout(t);
  }, [finish]);

  // Autoplay can be silently rejected by the browser — retry muted, then bail.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const attempt = el.play();
    if (attempt) attempt.catch(() => finish());
  }, [finish]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={`intro ${leaving ? "intro-leaving" : ""}`} aria-label="CUP2EAT brand film">
      <video
        ref={video}
        className="intro-video"
        poster={asset("intro-poster.jpg")}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
        onTimeUpdate={(e) => {
          const d = e.currentTarget.duration;
          if (d) setProgress(e.currentTarget.currentTime / d);
        }}
      >
        <source src={asset("cup2eat-loade.mp4")} type="video/mp4" />
      </video>

      <div className="intro-top">
        <span className="logo logo-light">
          CUP<b>2</b>EAT
        </span>
        <p className="intro-kicker">EAT YOUR DRINK</p>
      </div>

      <button className="intro-skip" onClick={finish} type="button">
        Skip intro
      </button>

      <div className="intro-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
}
