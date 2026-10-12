import { css } from "styled-components";

export const breakpoints = {
  compact: 360, // 이보다 좁으면 작은 폰 (iPhone SE 1세대 320, 갤럭시 폴드 접은 화면)
  frame: 768, // 이상이면 폰 프레임 모드
} as const;

export const media = {
  compact: `@media (max-width: ${breakpoints.compact - 0.02}px)`,
  frame: `@media (min-width: ${breakpoints.frame}px)`,
} as const;

export const layout = {
  frameWidth: 393,
  frameMaxHeight: 852,
  frameHeight: "var(--frame-height)", // 100dvh 대신 사용
  gutter: 20,
} as const;

// 페이지에는 AppLayout이 이미 적용함. fixed 요소나 포털에만 사용
export const gutterX = css`
  padding-left: max(${layout.gutter}px, env(safe-area-inset-left));
  padding-right: max(${layout.gutter}px, env(safe-area-inset-right));
`;

// createPortal로 body에 바로 붙는 요소(모달, 토스트 등)는 프레임 밖에서 렌더링되므로
// 이걸로 프레임과 같은 폭을 맞춘다. AppLayout의 Frame 폭과 같이 유지할 것
export const frameWidth = css`
  width: 100%;

  ${media.frame} {
    width: min(${layout.frameWidth}px, 100vw);
  }
`;
