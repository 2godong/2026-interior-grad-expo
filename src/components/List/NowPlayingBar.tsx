import { useAudio } from "@/components/audio/audioContext";
import { formatTime } from "@/utils/formatTime";
import AudioBar from "./Audio";

// 지금(또는 마지막으로) 재생한 도슨트의 하단 오디오바. 재생한 적이 없으면 렌더링하지 않는다
export default function NowPlayingBar() {
  const { track, isPlaying, current, duration, toggle } = useAudio();
  if (!track) return null;

  return (
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
  );
}
