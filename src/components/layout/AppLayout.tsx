import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import {
  Outlet,
  useLocation,
  useMatches,
  useNavigationType,
} from "react-router";
import styled from "styled-components";
import { gutterX, layout, media } from "@/styles/media";
import { useAppHeight } from "./useAppHeight";

export type RouteHandle = {
  fullBleed?: boolean;
};

export default function AppLayout() {
  useAppHeight();

  const scrollRef = useRef<HTMLDivElement>(null);
  useScrollRestoration(scrollRef);

  const fullBleed = useMatches().some(
    (match) => (match.handle as RouteHandle | undefined)?.fullBleed,
  );

  return (
    <Backdrop>
      <Frame>
        <Scroll ref={scrollRef} $fullBleed={fullBleed}>
          <Outlet />
        </Scroll>
      </Frame>
    </Backdrop>
  );
}

// 히스토리 항목(location.key)별 스크롤 위치. 뒤로/앞으로 가기(POP)면 복원, 그 외엔 맨 위로.
const scrollPositions = new Map<string, number>();

function useScrollRestoration(scrollRef: RefObject<HTMLDivElement | null>) {
  const { key } = useLocation();
  const navigationType = useNavigationType();
  const keyRef = useRef(key);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const save = () => scrollPositions.set(keyRef.current, el.scrollTop);
    el.addEventListener("scroll", save, { passive: true });
    return () => el.removeEventListener("scroll", save);
  }, [scrollRef]);

  useLayoutEffect(() => {
    keyRef.current = key;
    const el = scrollRef.current;
    if (!el) return;
    const target =
      navigationType === "POP" ? (scrollPositions.get(key) ?? 0) : 0;
    el.scrollTo(0, target);
    if (el.scrollTop >= target) return;

    // 이미지 로딩 등으로 콘텐츠 높이가 늘어나면 목표 위치까지 다시 시도
    const content = el.firstElementChild;
    if (!content) return;
    const observer = new ResizeObserver(() => {
      el.scrollTo(0, target);
      if (el.scrollTop >= target) observer.disconnect();
    });
    observer.observe(content);
    const stop = () => observer.disconnect();
    const timer = window.setTimeout(stop, 1000);
    el.addEventListener("touchstart", stop, { once: true, passive: true });
    el.addEventListener("wheel", stop, { once: true, passive: true });
    return () => {
      stop();
      window.clearTimeout(timer);
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("wheel", stop);
    };
  }, [key, navigationType, scrollRef]);
}

const Backdrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: var(--app-height, 100dvh);
  background: ${({ theme }) => theme.colors.bg.backdrop};
`;

const Frame = styled.div`
  position: relative;
  width: 100%;
  height: var(--app-height, 100dvh);
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bg.page};
  transform: translateZ(0);

  ${media.frame} {
    width: min(${layout.frameWidth}px, 100vw);
    height: ${layout.frameHeight};
  }
`;

const Scroll = styled.div<{ $fullBleed: boolean }>`
  ${({ $fullBleed }) => !$fullBleed && gutterX}
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
