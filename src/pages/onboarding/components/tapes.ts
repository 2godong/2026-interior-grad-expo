import type { ThemeMode } from "@/styles/themeMode";

export type Point = [number, number];

export type Tape = {
  d: string;
  fill: string;
  from: Point;
  to: Point;
  delay: number;
  duration: number;
};

type TapeSet = {
  width: number;
  height: number;
  offsetX: number;
  offsetBottom: number;
  tapes: [Tape, Tape];
  label: { x: number; y: number; angle: number };
};

export const TAPE_OPACITY = 0.76;
export const EDGE = 1.5;
export const LIFT = 2.5;
export const FORESHORTEN = 0.3;
export const RELEASE = 240;

export const tapeSets: Record<ThemeMode, TapeSet> = {
  light: {
    width: 307,
    height: 157,
    offsetX: 10,
    offsetBottom: 22,
    tapes: [
      {
        d: "M249.825 79.6674L237.544 119.79L4.26448 60.7988L17.6866 19.4284L249.825 79.6674Z",
        fill: "#EDEBA6",
        from: [244, 100],
        to: [11, 40],
        delay: 400,
        duration: 1100,
      },
      {
        d: "M265.907 24.0266L302.056 49.2336L206.199 139.917L172.838 115.373L265.907 24.0266Z",
        fill: "#EBE9A4",
        from: [190, 128],
        to: [284, 37],
        delay: 0,
        duration: 750,
      },
    ],
    label: { x: 127, y: 70, angle: 14.5 },
  },
  dark: {
    width: 325,
    height: 199,
    offsetX: 4,
    offsetBottom: 2,
    tapes: [
      {
        d: "M8.49042 116.331L17.8069 157.244L254.773 115.453L244.41 73.2129L8.49042 116.331Z",
        fill: "#CFD983",
        from: [250, 94],
        to: [13, 137],
        delay: 400,
        duration: 1100,
      },
      {
        d: "M225.209 31.6252L187.315 54.1238L276.29 151.568L311.354 129.527L225.209 31.6252Z",
        fill: "#CFD983",
        from: [294, 141],
        to: [206, 43],
        delay: 0,
        duration: 750,
      },
    ],
    label: { x: 131, y: 116, angle: -10.4 },
  },
};

export const PEEL_TOTAL = Math.max(
  ...Object.values(tapeSets).flatMap((set) =>
    set.tapes.map((tape) => tape.delay + tape.duration + RELEASE),
  ),
);
