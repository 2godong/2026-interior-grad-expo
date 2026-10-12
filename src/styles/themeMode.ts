export type ThemeMode = "dark" | "light";

// 랜덤 선택은 index.html 인라인 스크립트가 함
export function getThemeMode(): ThemeMode {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
