// assets/docent 안의 이미지를 파일명(확장자 제외)으로 찾아 쓰기 위한 맵
// eager로 불러와도 URL 문자열만 번들에 들어가고, 실제 이미지는 렌더링될 때 로드된다
const modules = import.meta.glob<string>(
  "../assets/docent/*.{png,jpg,jpeg,webp,gif,svg}",
  { eager: true, import: "default" },
);

const images: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const name = path.split("/").pop()!.replace(/\.[^.]+$/, "");
  images[name] = url;
}

/** 예: img("01-model-main") → assets/docent/01-model-main.webp 의 URL */
export function img(name: string) {
  const url = images[name];
  if (!url && import.meta.env.DEV) {
    console.warn(`[docent] 이미지를 찾을 수 없음: ${name}`);
  }
  return url ?? "";
}
