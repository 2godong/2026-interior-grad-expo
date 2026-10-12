import { css } from "styled-components";

// 화면 폭 기준값(px)
export const breakpoints = {
  compact: 360, // 이보다 좁으면 작은 폰 (iPhone SE 1세대 320, 갤럭시 폴드 접은 화면)
  frame: 768, // 이 이상(태블릿·PC)이면 화면 가운데에 폰 프레임으로 보여줌
} as const;

// styled-components 안에서 `${media.compact} { ... }` 형태로 사용
export const media = {
  compact: `@media (max-width: ${breakpoints.compact - 0.02}px)`,
  frame: `@media (min-width: ${breakpoints.frame}px)`,
} as const;

export const layout = {
  frameWidth: 393, // 폰 프레임 폭 (Figma 프레임 기준)
  frameMaxHeight: 852, // 폰 프레임 최대 높이
  frameHeight: "var(--frame-height)", // 실제로 보이는 콘텐츠 영역 높이. 100dvh 대신 사용
  gutter: 20, // 좌우 여백 (Figma 기준)
  gutterCompact: 16, // 작은 폰의 좌우 여백
} as const;

// 페이지 콘텐츠의 좌우 여백. 노치가 있는 기기의 가로 모드에서는 safe-area만큼 더 띄움
export const gutterX = css`
  padding-left: max(${layout.gutter}px, env(safe-area-inset-left));
  padding-right: max(${layout.gutter}px, env(safe-area-inset-right));

  ${media.compact} {
    padding-left: max(${layout.gutterCompact}px, env(safe-area-inset-left));
    padding-right: max(${layout.gutterCompact}px, env(safe-area-inset-right));
  }
`;

// createPortal로 body에 바로 붙는 요소(모달, 토스트 등)는 프레임 밖에서 렌더링되므로
// 이걸로 프레임과 같은 폭을 맞춘다. AppLayout의 Frame 폭과 같이 유지할 것
export const frameWidth = css`
  width: 100%;

  ${media.frame} {
    width: min(${layout.frameWidth}px, 100vw);
  }
`;
