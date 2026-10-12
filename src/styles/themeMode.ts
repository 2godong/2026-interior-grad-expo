export type ThemeMode = "dark" | "light";

// 모드는 index.html의 인라인 스크립트가 접속 시 랜덤으로 정해 <html data-theme>에 넣어 둔다.
// 여기서는 그 값만 읽는다.
export function getThemeMode(): ThemeMode {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
