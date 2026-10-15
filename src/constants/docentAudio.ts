// assets/audio 안의 오디오를 파일명(확장자 제외)으로 찾아 쓰기 위한 맵
// eager로 불러와도 URL 문자열만 번들에 들어가고, 실제 파일은 재생할 때 로드된다
const modules = import.meta.glob<string>("../assets/audio/*.{mp3,m4a,wav}", {
  eager: true,
  import: "default",
});

const audios: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const name = path.split("/").pop()!.replace(/\.[^.]+$/, "");
  audios[name] = url;
}

/** 예: audio("01-model") → assets/audio/01-model.mp3 의 URL */
export function audio(name: string) {
  const url = audios[name];
  if (!url && import.meta.env.DEV) {
    console.warn(`[docent] 오디오를 찾을 수 없음: ${name}`);
  }
  return url;
}
