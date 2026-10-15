import { useEffect, useRef } from "react";
import { useAudio } from "@/components/audio/audioContext";
import { formatTime } from "@/utils/formatTime";
import AudioBar from "./Audio";

// 지금(또는 마지막으로) 재생한 도슨트의 하단 오디오바. 재생한 적이 없으면 렌더링하지 않는다
export default function NowPlayingBar() {
  const { track, isPlaying, current, duration, toggle, dismiss } = useAudio();
  const barRef = useRef<HTMLDivElement>(null);

  // 일시 정지 상태에서 오디오바 바깥을 누르면 오디오바를 닫는다
  useEffect(() => {
    if (!track || isPlaying) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) dismiss();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [track, isPlaying, dismiss]);

  if (!track) return null;

  return (
    <div ref={barRef} style={{ display: "contents" }}>
      <AudioBar
        teamId={track.teamId}
        zone={track.zone}
        isPlaying={isPlaying}
        teamName={`${track.teamId.padStart(2, "0")}팀`}
        title={track.title}
        currentTime={formatTime(current)}
        duration={duration ? formatTime(duration) : track.duration}
        onToggle={toggle}
      />
    </div>
  );
}
