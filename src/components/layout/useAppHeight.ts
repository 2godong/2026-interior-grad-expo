import { useEffect } from "react";

// 삼성 인터넷 등 일부 갤럭시 브라우저는 100dvh를 실제 보이는 높이보다 크게 계산해
// 짧은 페이지 아래에 빈 공간이 생긴다. 실제 높이를 --app-height에 넣어 대신 쓴다.
export function useAppHeight() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => root.style.setProperty("--app-height", `${window.innerHeight}px`);

    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);
}
