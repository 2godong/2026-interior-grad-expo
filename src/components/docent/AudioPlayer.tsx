import { useRef, useState, type ChangeEvent } from "react";
import * as S from "./AudioPlayer.styles";
import playIcon from "@/assets/playIcon.svg";
import stopIcon from "@/assets/stopIcon.svg";
import { formatTime } from "@/utils/formatTime";

interface AudioPlayerProps {
  src?: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !src) return;
    if (audio.paused) audio.play();
    else audio.pause();
  };

  const seek = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) audioRef.current.currentTime = Number(e.target.value);
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <S.Player>
      <audio
        ref={audioRef}
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

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
            <span>{formatTime(duration)}</span>
          </S.Times>
        </S.ProgressWrap>
      </S.Body>
    </S.Player>
  );
}
