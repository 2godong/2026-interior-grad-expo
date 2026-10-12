import type { TeamId } from "@/data/teams";

// 좌표는 Figma 393px 프레임 기준. 도면 영역은 프레임 y 116px부터 시작하므로 그만큼 뺀 값
export const PLAN_WIDTH = 393;
export const PLAN_HEIGHT = 816; // ENTRANCE 아래 여백 포함
export const BOOTH_SIZE = 27;

const TOP = 116;

export type Booth = {
  id: string;
  team: TeamId;
  zone: "media" | "model";
  x: number;
  y: number;
};

// 팀마다 미디어 존과 모델 존에 부스가 하나씩 있음
const raw: [TeamId, Booth["zone"], number, number][] = [
  ["08", "media", 144.4, 144.4],
  ["09", "media", 184.5, 144.4],
  ["04", "media", 225.4, 144.4],
  ["05", "media", 265.5, 144.4],
  ["10", "media", 64.2, 182.1],
  ["07", "media", 64.2, 222.2],
  ["03", "media", 64.2, 263.1],
  ["01", "media", 64.2, 303.2],
  ["11", "media", 299.2, 182.1],
  ["06", "media", 299.2, 222.2],
  ["02", "media", 299.2, 263.1],
  ["11", "model", 297.6, 355.3],
  ["10", "model", 297.6, 440.3],
  ["09", "model", 297.6, 525.3],
  ["08", "model", 297.6, 609.6],
  ["03", "model", 66.6, 393.8],
  ["02", "model", 66.6, 478.8],
  ["01", "model", 66.6, 565.4],
  ["06", "model", 164.4, 458.8],
  ["07", "model", 205.3, 458.8],
  ["04", "model", 164.4, 506.1],
  ["05", "model", 205.3, 506.1],
];

export const booths: Booth[] = raw.map(([team, zone, x, y]) => ({
  id: `${zone}-${team}`,
  team,
  zone,
  x,
  y: y - TOP,
}));

// 벽선 (각 항목은 이어지는 점들)
export const walls: [number, number][][] = [
  [[67.4, 131.9], [324.9, 131.9]],
  [[50.9, 160.4], [50.9, 732.3]],
  [[339.3, 162], [339.3, 861.4]],
  [[275.9, 674.5], [340.5, 674.5]],
  [[67.4, 757.9], [248.6, 757.9]],
  [[186.5, 757.9], [186.5, 860.6], [251, 860.6]],
  [[317.6, 860.6], [340.5, 860.6]],
].map((line) => line.map(([x, y]) => [x, y - TOP] as [number, number]));

export const planY = (y: number) => y - TOP;
