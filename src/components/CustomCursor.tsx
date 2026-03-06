"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // ── lerp state ────────────────────────────────────────
    let ringX = 0, ringY = 0;           // ring's current rendered position
    let targetX = 0, targetY = 0;       // where ring is heading
    let targetW = 34, targetH = 34;     // default size
    let morphed = false;                 // true while hugging an element
    let raf: number;

    // ── helpers ───────────────────────────────────────────
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const SPEED = 0.11;

    // ── animate loop ─────────────────────────────────────
    const tick = () => {
      ringX = lerp(ringX, targetX, SPEED);
      ringY = lerp(ringY, targetY, SPEED);
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;
      raf = requestAnimationFrame(tick);
    };

    // ── mouse move ────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;

      if (!morphed) {
        // free-roaming: ring follows cursor center
        targetX = e.clientX;
        targetY = e.clientY;
      }
    };

    // ── morph ring to element ─────────────────────────────
    const morphTo = (el: Element) => {
      const rect     = el.getBoundingClientRect();
      const computed = window.getComputedStyle(el);
      const PAD      = 5; // extra breathing room around element

      const w = rect.width  + PAD * 2;
      const h = rect.height + PAD * 2;

      // Parse the actual computed border-radius so we mirror it exactly
      // then add PAD so the ring hugs with the same rounding
      const rawBr = computed.borderRadius || "0px";
      // Add PAD to each corner value
      const br = rawBr
        .split(" ")
        .map((v) => {
          const n = parseFloat(v);
          if (isNaN(n)) return v;
          // For very high radii (pill shapes) keep them high; otherwise add padding
          return n > 50 ? "999px" : `${n + PAD}px`;
        })
        .join(" ");

      ring.style.width        = `${w}px`;
      ring.style.height       = `${h}px`;
      ring.style.borderRadius = br;
      ring.style.opacity      = "0.6";

      // Steer the lerp toward the element's center
      targetX = rect.left + rect.width  / 2;
      targetY = rect.top  + rect.height / 2;
      targetW = w;
      targetH = h;
      morphed = true;

      // Hide dot when morphed
      dot.style.opacity = "0";
      dot.style.transform = "translate(-50%,-50%) scale(0)";
    };

    // ── reset ring to circle ──────────────────────────────
    const resetMorph = (e: MouseEvent) => {
      ring.style.width        = "34px";
      ring.style.height       = "34px";
      ring.style.borderRadius = "50%";
      ring.style.opacity      = "0.45";
      targetW = 34;
      targetH = 34;
      morphed = false;

      // Restore dot
      dot.style.opacity   = "1";
      dot.style.transform = "translate(-50%,-50%) scale(1)";

      // Snap ring lerp position back to cursor immediately
      targetX = e.clientX;
      targetY = e.clientY;
    };

    // ── click feedback ────────────────────────────────────
    const onDown = () => {
      ring.style.transform = "translate(-50%,-50%) scale(0.88)";
      document.body.classList.add("cursor-click");
    };
    const onUp = () => {
      ring.style.transform = "translate(-50%,-50%) scale(1)";
      document.body.classList.remove("cursor-click");
    };

    // ── attach listeners ──────────────────────────────────
    const SELECTOR =
      "a, button, [role='button'], label, input, textarea, select, [data-cursor-morph]";

    const attached = new WeakSet<Element>();

    const attachEl = (el: Element) => {
      if (attached.has(el)) return;
      attached.add(el);
      el.addEventListener("mouseenter", () => morphTo(el));
      el.addEventListener("mouseleave", (e) => resetMorph(e as MouseEvent));
    };

    const attachAll = () => {
      document.querySelectorAll(SELECTOR).forEach(attachEl);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);
    attachAll();

    const observer = new MutationObserver(attachAll);
    observer.observe(document.body, { childList: true, subtree: true });

    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-dot"  ref={dotRef}  />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
