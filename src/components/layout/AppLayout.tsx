import { useEffect, useRef } from "react";
import { Outlet, useLocation, useMatches } from "react-router";
import styled from "styled-components";
import { gutterX, layout, media } from "@/styles/media";
import { useAppHeight } from "./useAppHeight";

export type RouteHandle = {
  fullBleed?: boolean;
};

export default function AppLayout() {
  useAppHeight();

  const scrollRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [pathname]);

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
