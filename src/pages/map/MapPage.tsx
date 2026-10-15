import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import {
  TransformComponent,
  TransformWrapper,
  type ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";
import styled from "styled-components";
import { useAudio } from "@/components/audio/audioContext";
import NowPlayingBar from "@/components/List/NowPlayingBar";
import { AUDIO_BAR_SPACE } from "@/components/List/Audio.styles";
import { TabHeader } from "@/components/layout/Header";
import { getWork } from "@/constants/projects";
import { isTeamId } from "@/data/teams";
import { layout } from "@/styles/media";
import type { Booth } from "./booths";
import ExhibitionPanel from "./components/ExhibitionPanel";
import FloorPlan from "./components/FloorPlan";
import ZoomControls from "./components/ZoomControls";
import { MAX_SCALE, MIN_SCALE, useWheelZoom } from "./useWheelZoom";

const FOCUS_SCALE = 2.2;

export default function MapPage() {
  const zoom = useRef<ReactZoomPanPinchContentRef>(null);
  const viewport = useRef<HTMLDivElement>(null);
  useWheelZoom(viewport, zoom);

  const [params, setParams] = useSearchParams();
  const { track, play } = useAudio();
  // 지금 재생 중(또는 일시 정지)인 작품의 부스를 표시
  // (부스 번호는 "01", 작품 데이터의 teamId는 "1")
  const selected: Pick<Booth, "team" | "zone"> | null = track
    ? {
        team: track.teamId.padStart(2, "0") as Booth["team"],
        zone: track.zone as Booth["zone"],
      }
    : null;

  // ?team=01&zone=model 로 들어오면 그 작품을 선택 (자동 재생이 막히면 일시 정지 상태로 표시)
  useEffect(() => {
    const team = params.get("team");
    const zone = params.get("zone");
    if (!isTeamId(team) || (zone !== "media" && zone !== "model")) return;
    const work = getWork(String(Number(team)), zone);
    if (work) play(work);
    // 처음 들어왔을 때 한 번만
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 주소의 team·zone을 선택된 부스와 맞춘다 (오디오바가 닫히면 주소에서도 지움)
  const selectedTeam = selected?.team;
  const selectedZone = selected?.zone;
  const hadSelection = useRef(false);
  useEffect(() => {
    if (selectedTeam && selectedZone) hadSelection.current = true;
    // 첫 렌더에서 아직 선택 전이면 주소로 들어온 값을 지우지 않는다
    else if (!hadSelection.current) return;
    setParams(
      (prev) => {
        if (selectedTeam && selectedZone) {
          prev.set("team", selectedTeam);
          prev.set("zone", selectedZone);
        } else {
          prev.delete("team");
          prev.delete("zone");
        }
        return prev;
      },
      { replace: true },
    );
  }, [selectedTeam, selectedZone, setParams]);

  const selectBooth = (booth: Booth, element: HTMLButtonElement) => {
    // 부스를 바꾸면 그 작품을 처음부터 재생
    const work = getWork(String(Number(booth.team)), booth.zone);
    if (work) play(work);
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
            <FloorPlan selected={selected} onSelect={selectBooth} />
          </TransformComponent>
          <ZoomControls />
        </TransformWrapper>
      </Viewport>

      {/* 재생한 작품이 있으면 오디오바, 없으면 전시 정보 */}
      {track ? <NowPlayingBar /> : <ExhibitionPanel />}
    </Page>
  );
}

const Page = styled.main`
  display: flex;
  flex-direction: column;
  height: ${layout.frameHeight};
  /* 하단에 떠 있는 오디오바·전시 정보 칸 자리 */
  padding-bottom: ${AUDIO_BAR_SPACE}px;
  box-sizing: border-box;
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
