import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
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
