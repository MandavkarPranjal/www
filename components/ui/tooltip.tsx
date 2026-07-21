"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactElement, ReactNode } from "react";
import { createPortal } from "react-dom";

import { EASE_OUT } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

type Side = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  side?: Side;
  /** Delay before showing (ms). Default 120. */
  delay?: number;
  className?: string;
  /** Classes for the outer wrapper span. Use to fix baseline / fill parent. */
  wrapperClassName?: string;
}

// Gap between trigger and tooltip, in px.
const GAP = 8;

// Centering transform for the fixed-positioned anchor point, per side.
const anchorTransform: Record<Side, string> = {
  bottom: "translate(-50%, 0)",
  left: "translate(-100%, -50%)",
  right: "translate(0, -50%)",
  top: "translate(-50%, -100%)",
};

const transformOrigin: Record<Side, string> = {
  bottom: "center top",
  left: "right center",
  right: "left center",
  top: "center bottom",
};

// Offset is in the direction *away* from the trigger — content originates near
// the trigger and rises into resting position.
const offsetFrom: Record<Side, { x?: number; y?: number }> = {
  bottom: { y: -8 },
  left: { x: 8 },
  right: { x: -8 },
  top: { y: 8 },
};

const buildVariants = (side: Side): Variants => {
  const o = offsetFrom[side];
  return {
    animate: {
      filter: "blur(0px)",
      opacity: 1,
      scale: 1,
      transition: {
        damping: 30,
        filter: { duration: 0.18, ease: EASE_OUT },
        mass: 0.7,
        opacity: { duration: 0.14, ease: EASE_OUT },
        stiffness: 380,
        type: "spring",
      },
      x: 0,
      y: 0,
    },
    exit: {
      filter: "blur(3px)",
      opacity: 0,
      scale: 0.94,
      transition: { duration: 0.12, ease: EASE_OUT },
      x: (o.x ?? 0) * 0.6,
      y: (o.y ?? 0) * 0.6,
    },
    initial: {
      filter: "blur(5px)",
      opacity: 0,
      scale: 0.9,
      x: o.x ?? 0,
      y: o.y ?? 0,
    },
  };
};

const REDUCED_VARIANTS: Variants = {
  animate: { opacity: 1, transition: { duration: 0.14, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.1, ease: EASE_OUT } },
  initial: { opacity: 0 },
};

// Once any tooltip has just closed, neighbouring tooltips open without the
// initial delay — moving along a toolbar feels instant after the first one.
const WARM_WINDOW_MS = 300;
let lastHiddenAt = 0;

export const Tooltip = ({
  content,
  children,
  side = "top",
  delay = 120,
  className,
  wrapperClassName,
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );
  const id = useId();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();

  // Anchor point in viewport coords, on the edge of the trigger facing `side`.
  // Position:fixed means these viewport coords place the tooltip directly, so
  // it escapes every ancestor's stacking context and overflow.
  const place = useCallback(() => {
    const el = anchorRef.current;
    if (!el) {
      return;
    }
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const point: Record<Side, { top: number; left: number }> = {
      bottom: { left: cx, top: r.bottom + GAP },
      left: { left: r.left - GAP, top: cy },
      right: { left: r.right + GAP, top: cy },
      top: { left: cx, top: r.top - GAP },
    };
    setCoords(point[side]);
  }, [side]);

  const show = useCallback(() => {
    if (!canHover) {
      return;
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }
    const warm = Date.now() - lastHiddenAt < WARM_WINDOW_MS;
    timer.current = setTimeout(
      () => {
        place();
        setOpen(true);
      },
      warm ? 0 : delay
    );
  }, [canHover, delay, place]);

  const hide = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    if (open) {
      lastHiddenAt = Date.now();
    }
    setOpen(false);
  }, [open]);

  // Keep the tooltip pinned to the trigger while it's open and the page scrolls
  // or resizes (fixed coords are viewport-relative).
  useEffect(() => {
    if (!open) {
      return;
    }
    const onMove = () => place();
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [open, place]);

  const variants = useMemo(
    () => (reduce ? REDUCED_VARIANTS : buildVariants(side)),
    [reduce, side]
  );

  if (!isValidElement(children)) {
    return children;
  }

  const trigger = cloneElement(
    children as ReactElement<Record<string, unknown>>,
    {
      "aria-describedby": id,
      onBlur: hide,
      onFocus: show,
      onMouseEnter: show,
      onMouseLeave: hide,
    }
  );

  return (
    <>
      <span
        ref={anchorRef}
        className={cn("relative inline-flex align-middle", wrapperClassName)}
      >
        {trigger}
      </span>
      {typeof document === "undefined"
        ? null
        : createPortal(
            <AnimatePresence>
              {open && coords ? (
                <span
                  aria-hidden
                  className="pointer-events-none fixed z-[9999]"
                  style={{
                    left: coords.left,
                    top: coords.top,
                    transform: anchorTransform[side],
                  }}
                >
                  <motion.span
                    id={id}
                    role="tooltip"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{ transformOrigin: transformOrigin[side] }}
                    className={cn(
                      "block whitespace-nowrap rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-lg",
                      className
                    )}
                  >
                    {content}
                  </motion.span>
                </span>
              ) : null}
            </AnimatePresence>,
            document.body
          )}
    </>
  );
};
