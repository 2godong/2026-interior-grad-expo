import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import styled from "styled-components";
import { layout, media } from "@/styles/media";
import { useAppHeight } from "./useAppHeight";

// 모든 페이지를 감싸는 모바일 레이아웃.
// - 768px 미만(폰): 화면을 꽉 채움
// - 768px 이상(태블릿·PC): 393px 폭, 최대 852px 높이의 폰 프레임을 화면 가운데에 띄움
// 스크롤은 브라우저가 아니라 프레임 안(Scroll)에서 일어난다.
export default function AppLayout() {
  useAppHeight();

  // 스크롤이 브라우저가 아니라 Scroll 안에서 일어나므로, 페이지가 바뀌면 직접 맨 위로 올린다
  const scrollRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Backdrop>
      <Frame>
        <Scroll ref={scrollRef}>
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
  /* 안쪽의 position: fixed 요소(하단 재생 바 등)가 브라우저 화면이 아니라 이 프레임에 붙게 함 */
  transform: translateZ(0);

  /* hover/pointer 조건 없이 폭만 본다. S펜 갤럭시는 손가락 터치 중에도 hover를 지원한다고
     응답해서, 그 조건을 넣으면 폰인데도 프레임 모드가 된다. */
  ${media.frame} {
    width: min(${layout.frameWidth}px, 100vw);
    height: ${layout.frameHeight};
  }
`;

const Scroll = styled.div`
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
