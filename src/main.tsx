import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { themes } from "@/styles/theme";
import { getThemeMode } from "@/styles/themeMode";
import { GlobalStyle } from "@/styles/GlobalStyle";
import AppLayout from "@/components/layout/AppLayout";
import "@/styles/fonts.css";
import App from "./App";

const theme = themes[getThemeMode()];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppLayout>
        <App />
      </AppLayout>
    </ThemeProvider>
  </StrictMode>,
);
