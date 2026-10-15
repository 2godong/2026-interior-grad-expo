import { createContext, useContext } from "react";
import type { Project } from "@/constants/projects";

export interface AudioState {
  /** 마지막으로 재생한 작품. 한 번도 재생하지 않았으면 undefined */
  track?: Project;
  isPlaying: boolean;
  current: number;
  duration: number;
  /** 해당 작품을 재생. 이미 그 작품이면 이어서 재생 */
  play: (work: Project) => void;
  toggle: () => void;
  seek: (time: number) => void;
  /** 재생을 멈추고 작품 선택도 해제해 오디오바를 닫는다 */
  dismiss: () => void;
}

export const AudioContext = createContext<AudioState | null>(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio는 AudioProvider 안에서만 쓸 수 있음");
  return ctx;
}

export const isSameWork = (a?: Project, b?: Project) =>
  !!a && !!b && a.teamId === b.teamId && a.zone === b.zone;
