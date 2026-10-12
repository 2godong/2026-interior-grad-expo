import { createGlobalStyle } from "styled-components";
import { layout, media } from "./media";

export const GlobalStyle = createGlobalStyle`
  :root {
    /* 콘텐츠 영역의 실제 높이. 폰에서는 화면 높이, 태블릿·PC에서는 폰 프레임 높이 */
    --frame-height: var(--app-height, 100dvh);

    ${media.frame} {
      --frame-height: min(${layout.frameMaxHeight}px, var(--app-height, 100dvh));
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    min-height: 100%;
  }

  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  body {
    background: ${({ theme }) => theme.colors.bg.page};
    color: ${({ theme }) => theme.colors.fg.primary};
    font-family: ${({ theme }) => theme.fonts.family.base};
    -webkit-font-smoothing: antialiased;
  }

  button,
  input,
  textarea {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
