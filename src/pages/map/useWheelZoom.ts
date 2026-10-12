import { useEffect, type RefObject } from "react";
import type { ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";

export const MIN_SCALE = 0.5;
export const MAX_SCALE = 4;

const SENSITIVITY = 0.0015; // 마우스 휠 한 칸(deltaY 약 100)에 약 14%
const ANIMATION = 160;

// 라이브러리 기본 휠 줌은 deltaY에 비례해 더해서 마우스 휠 한 칸에 배율이 크게 튀고 애니메이션도 없다.
// 배율을 곱셈으로 바꾸고 짧은 애니메이션으로 따라가게 해서 부드럽게 만든다.
export function useWheelZoom(
  viewportRef: RefObject<HTMLElement | null>,
  zoomRef: RefObject<ReactZoomPanPinchContentRef | null>,
) {
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    // 연속으로 굴리는 동안은 애니메이션 중간값이 아니라 목표 배율에 누적
    let target: number | null = null;
    let idleTimer = 0;

    const onWheel = (e: WheelEvent) => {
      const zoom = zoomRef.current;
      if (!zoom) return;
      e.preventDefault(); // 트랙패드 핀치(ctrl+휠)가 브라우저 화면 확대로 새지 않게

      const deltaY = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? e.deltaY * 33 : e.deltaY;
      const strength = e.ctrlKey ? SENSITIVITY * 3 : SENSITIVITY; // 핀치는 delta가 작게 들어옴

      target ??= zoom.instance.state.scale;
      target = Math.min(MAX_SCALE, Math.max(MIN_SCALE, target * Math.exp(-deltaY * strength)));
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
