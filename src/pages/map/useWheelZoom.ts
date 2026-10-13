import { useEffect, type RefObject } from "react";
import type { ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";

export const MIN_SCALE = 0.5;
export const MAX_SCALE = 4;

const SENSITIVITY = 0.0015;
const ANIMATION = 160;

export function useWheelZoom(
  viewportRef: RefObject<HTMLElement | null>,
  zoomRef: RefObject<ReactZoomPanPinchContentRef | null>,
) {
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let target: number | null = null;
    let idleTimer = 0;

    const onWheel = (e: WheelEvent) => {
      const zoom = zoomRef.current;
      if (!zoom) return;
      e.preventDefault();

      const deltaY =
        e.deltaMode === WheelEvent.DOM_DELTA_LINE ? e.deltaY * 33 : e.deltaY;
      const strength = e.ctrlKey ? SENSITIVITY * 3 : SENSITIVITY;

      target ??= zoom.instance.state.scale;
      target = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, target * Math.exp(-deltaY * strength)),
      );
      zoom.zoomToPoint(target, e.clientX, e.clientY, ANIMATION, "easeOut");

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => (target = null), 200);
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      viewport.removeEventListener("wheel", onWheel);
      window.clearTimeout(idleTimer);
    };
  }, [viewportRef, zoomRef]);
}
