import { useRef, type PointerEvent } from "react";
import styled from "styled-components";
import { teams, type TeamId } from "@/data/teams";
import { BOOTH_SIZE, PLAN_HEIGHT, PLAN_WIDTH, booths, planY, walls, type Booth } from "../booths";

type Props = {
  selectedTeam: TeamId | null;
  onSelect: (booth: Booth, element: HTMLButtonElement) => void;
};

const DRAG_TOLERANCE = 6; // 이보다 많이 움직였으면 도면을 끈 것으로 보고 클릭으로 치지 않음

export default function FloorPlan({ selectedTeam, onSelect }: Props) {
  const pressedAt = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: PointerEvent) => {
    pressedAt.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <Plan>
      <svg width={PLAN_WIDTH} height={PLAN_HEIGHT} viewBox={`0 0 ${PLAN_WIDTH} ${PLAN_HEIGHT}`} aria-hidden>
        <g className="line">
          {walls.map((points, i) => (
            <polyline key={i} points={points.join(" ")} strokeWidth={2.4} />
          ))}
          <line x1={197.7} y1={planY(449.1)} x2={197.7} y2={planY(543.7)} strokeWidth={2} />
          {/* 아카이브 존 */}
          <path
            d={`M158.8 ${planY(270)}H190.9M158.8 ${planY(304.4)}H190.9M155.2 ${planY(275.1)}V${planY(300)}M196.1 ${planY(275.1)}V${planY(300)}`}
            strokeWidth={1}
          />
          {/* 입구 화살표 */}
          <path
            d={`M286 ${planY(806)}V${planY(892.6)}M273.5 ${planY(818.5)}L286 ${planY(806)}L298.5 ${planY(818.5)}`}
            strokeWidth={2.4}
          />
        </g>

        <g className="label">
          <text x={195.5} y={planY(216.5)} textAnchor="middle">
            MEDIA ZONE
          </text>
          <text x={195.5} y={planY(591)} textAnchor="middle">
            MODEL ZONE
          </text>
          <text x={203} y={planY(281.5)}>
            ARCHIVE
          </text>
          <text x={203} y={planY(294.5)}>
            ZONE
          </text>
          <text x={285.5} y={planY(909.5)} textAnchor="middle">
            ENTRANCE
          </text>
        </g>

        {/* 글자 폭은 Figma와 같게 고정 */}
        <g className="slogan">
          <text x={52.9} y={planY(711)} textLength={40} lengthAdjust="spacingAndGlyphs">
            The
          </text>
          <text
            x={79.4}
            y={planY(746.7)}
            transform={`rotate(-12.9 79.4 ${planY(746.7)})`}
            textLength={146}
            lengthAdjust="spacingAndGlyphs"
          >
            In-Between Is
          </text>
          <text
            x={209.3}
            y={planY(747.5)}
            transform={`rotate(-3.5 209.3 ${planY(747.5)})`}
            textLength={106}
            lengthAdjust="spacingAndGlyphs"
          >
            Not a Void
          </text>
        </g>
      </svg>

      {booths.map((booth) => (
        <BoothButton
          key={booth.id}
          type="button"
          $active={booth.team === selectedTeam}
          style={{ left: booth.x, top: booth.y }}
          aria-label={`${booth.team}팀 ${teams[booth.team].join(" ")} 도슨트 재생`}
          aria-pressed={booth.team === selectedTeam}
          onPointerDown={onPointerDown}
          onClick={(e) => {
            const moved = Math.hypot(e.clientX - pressedAt.current.x, e.clientY - pressedAt.current.y);
            if (e.detail > 0 && moved > DRAG_TOLERANCE) return;
            onSelect(booth, e.currentTarget);
          }}
        >
          {booth.team}
        </BoothButton>
      ))}
    </Plan>
  );
}

const Plan = styled.div`
  position: relative;
  width: ${PLAN_WIDTH}px;
  height: ${PLAN_HEIGHT}px;

  svg {
    display: block;
  }

  .line {
    fill: none;
    stroke: ${({ theme }) => theme.colors.stroke.plan};
  }

  .label {
    font-size: 11px;
    letter-spacing: 0.12em;
    dominant-baseline: middle;
    fill: ${({ theme }) => theme.colors.fg.muted};
  }

  .slogan {
    font-size: 23px;
    font-weight: 700;
    fill: ${({ theme }) => theme.colors.stroke.plan};
  }
`;

const BoothButton = styled.button<{ $active: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${BOOTH_SIZE}px;
  height: ${BOOTH_SIZE}px;
  padding: 0;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.stroke.markerActive : "transparent")};
  background: ${({ theme, $active }) => ($active ? theme.colors.bg.markerActive : theme.colors.bg.marker)};
  color: ${({ theme, $active }) => ($active ? theme.colors.fg.onMarkerActive : theme.colors.fg.onMarker)};
  ${({ theme }) => theme.fonts.numeral};
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.stroke.plan};
    outline-offset: 2px;
  }
`;
