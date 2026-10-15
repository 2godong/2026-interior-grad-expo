import { useMemo, useRef, useState, type ReactNode } from "react";
import type { Project } from "@/constants/projects";
import { AudioContext, isSameWork, type AudioState } from "./audioContext";

// 페이지를 옮겨도 끊기지 않도록 앱 전체에서 <audio> 하나를 공유한다
export default function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [track, setTrack] = useState<Project>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const value = useMemo<AudioState>(() => {
    const audio = () => audioRef.current;
    return {
      track,
      isPlaying,
      current,
      duration,
      play: (work) => {
        const el = audio();
        if (!el) return;
        if (!isSameWork(track, work)) {
          setTrack(work);
          // 클릭 이벤트 안에서 바로 play()를 불러야 모바일에서 재생이 막히지 않는다
          if (work.audio) el.src = work.audio;
          else {
            el.removeAttribute("src");
            el.load();
          }
        }
        if (work.audio) void el.play();
      },
      toggle: () => {
        const el = audio();
        if (!el || !el.currentSrc) return;
        if (el.paused) void el.play();
        else el.pause();
      },
      seek: (time) => {
        const el = audio();
        if (el) el.currentTime = time;
      },
    };
  }, [track, isPlaying, current, duration]);

  return (
    <AudioContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        onEmptied={() => {
          setIsPlaying(false);
          setCurrent(0);
          setDuration(0);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
    </AudioContext.Provider>
  );
}
