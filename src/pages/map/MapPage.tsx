import { useRef } from "react";
import { useSearchParams } from "react-router";
import {
  TransformComponent,
  TransformWrapper,
  type ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";
import styled from "styled-components";
import { TabHeader } from "@/components/layout/Header";
import { isTeamId } from "@/data/teams";
import { layout } from "@/styles/media";
import type { Booth } from "./booths";
import FloorPlan from "./components/FloorPlan";
import ZoomControls from "./components/ZoomControls";
import { MAX_SCALE, MIN_SCALE, useWheelZoom } from "./useWheelZoom";

const FOCUS_SCALE = 2.2;

export default function MapPage() {
  const zoom = useRef<ReactZoomPanPinchContentRef>(null);
  const viewport = useRef<HTMLDivElement>(null);
  useWheelZoom(viewport, zoom);

  const [params, setParams] = useSearchParams();
  const team = params.get("team");
  const selectedTeam = isTeamId(team) ? team : null;

  const selectBooth = (booth: Booth, element: HTMLButtonElement) => {
    setParams(
      (prev) => {
        prev.set("team", booth.team);
        return prev;
      },
      { replace: true },
    );
    zoom.current?.zoomToElement(element, {
      scale: FOCUS_SCALE,
      animationTime: 450,
      animationType: "easeOut",
    });
  };

  return (
    <Page>
      <TabHeader title="전시장 도면" />
      <Guide>
        <span>번호를 누르면 도슨트가 재생됩니다.</span>
        <Legend>
          <LegendSwatch aria-hidden />
          재생 중
        </Legend>
      </Guide>
      <Viewport ref={viewport}>
        <TransformWrapper
          ref={zoom}
          fitOnInit="contain"
          minScale={MIN_SCALE}
          maxScale={MAX_SCALE}
          centerZoomedOut
          doubleClick={{ disabled: true }}
          wheel={{ disabled: true }}
        >
          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
            <FloorPlan selectedTeam={selectedTeam} onSelect={selectBooth} />
          </TransformComponent>
          <ZoomControls />
        </TransformWrapper>
      </Viewport>
    </Page>
  );
}

const Page = styled.main`
  display: flex;
  flex-direction: column;
  height: ${layout.frameHeight};
`;

const Guide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  height: 36px;
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.fg.accent};
`;

const Legend = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendSwatch = styled.span`
  width: 14px;
  height: 14px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.indicator};
  background: ${({ theme }) => theme.colors.bg.indicator};
`;

const Viewport = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  margin: 0 -${layout.gutter}px;
  overflow: hidden;
`;
