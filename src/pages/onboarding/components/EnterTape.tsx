import { useEffect, useRef } from "react";
import styled from "styled-components";
import type { ThemeMode } from "@/styles/themeMode";
import {
  EDGE,
  FORESHORTEN,
  LIFT,
  RELEASE,
  TAPE_OPACITY,
  tapeSets,
  type Point,
  type Tape,
} from "./tapes";

type Props = {
  mode: ThemeMode;
  peeling: boolean;
};

export default function EnterTape({ mode, peeling }: Props) {
  const { width, height, offsetX, offsetBottom, shiftY, tapes, label } = tapeSets[mode];

  const stuckRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flapInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!peeling) return;

    const axes = tapes.map((tape) => peelAxis(tape, width, height));
    const end = Math.max(
      ...tapes.map((tape) => tape.delay + tape.duration + RELEASE),
    );
    const startedAt = performance.now();
    let raf = 0;

    const draw = (now: number) => {
      const elapsed = now - startedAt;

      tapes.forEach((tape, i) => {
        const t = elapsed - tape.delay;
        if (t < 0) return;
        const axis = axes[i];
        const progress = easeInOut(Math.min(t / tape.duration, 1));
        const release = Math.min(Math.max((t - tape.duration) / RELEASE, 0), 1);

        const fold = axis.startPct + progress * (axis.endPct - axis.startPct);

        const stuckMask = `linear-gradient(${axis.angle}deg, transparent ${fold}%, #000 ${fold + EDGE}%)`;
        setMask(stuckRefs.current[i], stuckMask);
        if (i === 0) setMask(labelRef.current, stuckMask);

        setMask(
          flapInnerRefs.current[i],
          `linear-gradient(${axis.angle}deg, #000 ${fold}%, transparent ${fold + EDGE}%)`,
        );
        const flap = flapRefs.current[i];
        if (flap) {
          const foldPx = axis.pctToPx(fold + EDGE / 2);
          const lift = LIFT + release * 14;
          flap.style.transform = reflectAcross(axis.dir, foldPx, axis.up, lift);
          flap.style.opacity = String(1 - release);
        }
      });

      if (elapsed < end) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [peeling, tapes, width, height]);

  const tapeSvg = (tape: Tape) => (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
    >
      <path
        d={tape.d}
        fill={tape.fill}
        fillOpacity={TAPE_OPACITY}
        stroke={tape.fill}
        strokeOpacity={TAPE_OPACITY}
      />
    </svg>
  );

  const labelStyle = {
    left: label.x,
    top: label.y,
    transform: `translate(-50%, -50%) rotate(${label.angle}deg)`,
  };

  return (
    <Group
      style={{
        width,
        height,
        top: shiftY,
        marginBottom: offsetBottom,
        marginLeft: `calc(50% - ${width / 2 - offsetX}px)`,
      }}
    >
      {tapes.map((tape, i) => (
        <Layer key={i} ref={(el) => void (stuckRefs.current[i] = el)}>
          {tapeSvg(tape)}
        </Layer>
      ))}
      <Layer ref={labelRef}>
        <Label style={labelStyle}>화면을 탭하면 바로 입장합니다 →</Label>
      </Layer>
      {tapes.map((tape, i) => (
        <Flap key={i} ref={(el) => void (flapRefs.current[i] = el)}>
          <Layer ref={(el) => void (flapInnerRefs.current[i] = el)}>
            {tapeSvg(tape)}
            {i === 0 && (
              <BackLabel style={labelStyle}>
                화면을 탭하면 바로 입장합니다 →
              </BackLabel>
            )}
          </Layer>
        </Flap>
      ))}
    </Group>
  );
}

function peelAxis(tape: Tape, width: number, height: number) {
  const [vx, vy] = [tape.to[0] - tape.from[0], tape.to[1] - tape.from[1]];
  const len = Math.hypot(vx, vy);
  const dir: Point = [vx / len, vy / len];
  const lineLength = Math.abs(width * dir[0]) + Math.abs(height * dir[1]);
  const center = (width / 2) * dir[0] + (height / 2) * dir[1];
  const pxToPct = (px: number) => ((px - center) / lineLength + 0.5) * 100;
  const dot = ([x, y]: Point) => x * dir[0] + y * dir[1];
  const up: Point = -dir[0] < 0 ? [dir[1], -dir[0]] : [-dir[1], dir[0]];

  return {
    dir,
    up,
    angle: (Math.atan2(dir[0], -dir[1]) * 180) / Math.PI,
    startPct: pxToPct(dot(tape.from)) - EDGE,
    endPct: pxToPct(dot(tape.to)) + EDGE,
    pctToPx: (pct: number) => (pct / 100 - 0.5) * lineLength + center,
  };
}

function reflectAcross(
  [ux, uy]: Point,
  foldPx: number,
  [nx, ny]: Point,
  lift: number,
) {
  const k = 1 + FORESHORTEN;
  const a = 1 - k * ux * ux;
  const b = -k * ux * uy;
  const d = 1 - k * uy * uy;
  const e = k * foldPx * ux + nx * lift;
  const f = k * foldPx * uy + ny * lift;
  return `matrix(${a}, ${b}, ${b}, ${d}, ${e}, ${f})`;
}

function setMask(el: HTMLElement | null, mask: string) {
  if (!el) return;
  el.style.maskImage = mask;
  el.style.webkitMaskImage = mask;
}

function easeInOut(x: number) {
  return x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;
}

const Group = styled.div`
  position: relative;
  pointer-events: none;

  @media (max-height: 800px) {
    zoom: 0.85;
  }
  @media (max-height: 700px) {
    zoom: 0.72;
  }
`;

const Layer = styled.div`
  position: absolute;
  inset: 0;

  svg {
    display: block;
  }
`;

const Flap = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0;
  transform-origin: 0 0;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.28)) brightness(1.06);
`;

const Label = styled.span`
  position: absolute;
  white-space: nowrap;
  ${({ theme }) => theme.fonts.body};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.fg.onPanel};
`;

const BackLabel = styled(Label)`
  opacity: 0.25;
`;
