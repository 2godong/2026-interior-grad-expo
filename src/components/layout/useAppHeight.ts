import { useEffect } from "react";

export function useAppHeight() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () =>
      root.style.setProperty("--app-height", `${window.innerHeight}px`);

    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);
}
