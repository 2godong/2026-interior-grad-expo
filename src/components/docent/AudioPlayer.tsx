import type { ChangeEvent } from "react";
import * as S from "./AudioPlayer.styles";
import playIcon from "@/assets/playIcon.svg";
import stopIcon from "@/assets/stopIcon.svg";
import { isSameWork, useAudio } from "@/components/audio/audioContext";
import type { Project } from "@/constants/projects";
import { formatTime } from "@/utils/formatTime";

interface AudioPlayerProps {
  work: Project;
}

// 앱 전체가 공유하는 오디오를 이 작품 기준으로 보여준다.
// 다른 작품이 재생 중이면 이 플레이어는 정지 상태로 보이고, 누르면 이 작품으로 바뀐다
export default function AudioPlayer({ work }: AudioPlayerProps) {
  const audio = useAudio();
  const active = isSameWork(audio.track, work);
  const isPlaying = active && audio.isPlaying;
  const current = active ? audio.current : 0;
  const duration = active ? audio.duration : 0;

  const toggle = () => {
    if (!work.audio) return;
    if (active) audio.toggle();
    else audio.play(work);
  };

  const seek = (e: ChangeEvent<HTMLInputElement>) => {
    if (active) audio.seek(Number(e.target.value));
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <S.Player>
      <S.Top>
        <S.Label>AUDIO DOCENT</S.Label>
        {/* 아이콘과 같이 현재 상태를 표시. 누르면 재생/정지 전환 */}
        <S.TextButton
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "일시 정지" : "재생"}
        >
          {isPlaying ? "재생 중" : "일시 정지"}
        </S.TextButton>
      </S.Top>

      <S.Body>
        <S.IconButton
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "일시 정지" : "재생"}
        >
          <S.Icon src={isPlaying ? playIcon : stopIcon} alt="" />
        </S.IconButton>

        <S.ProgressWrap>
          <S.Range
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={seek}
            $progress={progress}
            aria-label="재생 위치"
          />
          <S.Times>
            <span>{formatTime(current)}</span>
            <span>{duration ? formatTime(duration) : work.duration}</span>
          </S.Times>
        </S.ProgressWrap>
      </S.Body>
    </S.Player>
  );
}
