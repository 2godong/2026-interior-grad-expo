import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { paths } from "@/paths";
import { layout } from "@/styles/media";
import { getThemeMode } from "@/styles/themeMode";
import mainPoster from "@/assets/onboarding/main_poster.webp";
import mainPic from "@/assets/onboarding/main_pic.webp";
import subPoster from "@/assets/onboarding/sub_poster.webp";
import subPic from "@/assets/onboarding/sub_pic.webp";
import EnterTape from "./components/EnterTape";
import PosterInfo from "./components/PosterInfo";
import { PEEL_TOTAL } from "./components/tapes";

const visuals = {
  light: { poster: mainPoster, pic: mainPic },
  dark: { poster: subPoster, pic: subPic },
} as const;

export default function OnboardingPage() {
  const mode = getThemeMode();
  const { poster, pic } = visuals[mode];
  const navigate = useNavigate();

  const [peeling, setPeeling] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const enter = () => {
    if (peeling) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      navigate(paths.map);
      return;
    }
    setPeeling(true);
    timer.current = window.setTimeout(() => navigate(paths.map), PEEL_TOTAL);
  };

  return (
    <Page>
      <BlurredPic src={pic} alt="" aria-hidden />
      {/* 화면이 짧으면 포스터가 남는 높이에 맞춰 줄어들어 아래 테이프와 겹치지 않음 */}
      <PosterArea>
        <Poster
          src={poster}
          alt="사이는 공간: (비어 있는 곳)이 아니다 — 덕성여자대학교 실내디자인전공 제61회 졸업전시회 포스터"
          fetchPriority="high"
        />
      </PosterArea>
      <TapeSlot>
        <EnterTape mode={mode} peeling={peeling} />
      </TapeSlot>
      {/* 화면이 길면 남는 높이는 테이프와 하단 정보 사이로 감 */}
      <Footer>
        <PosterInfo mode={mode} />
      </Footer>
      <EnterButton
        type="button"
        onClick={enter}
        aria-label="전시장 도면으로 입장하기"
      />
    </Page>
  );
}

const Page = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  height: ${layout.frameHeight};
  overflow: hidden;
  isolation: isolate;
`;

const BlurredPic = styled.img`
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
  filter: blur(32px);
  transform: scale(1.15); /* 블러 가장자리가 비치지 않게 살짝 키움 */
`;

const PosterArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 0 1 auto;
  min-height: 0;
`;

const Poster = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  mask-image: linear-gradient(to bottom, #000 88%, transparent 100%);
`;

// 테이프 위쪽 여백이 포스터의 흐려지는 끝부분에 겹치도록 끌어올림
const TapeSlot = styled.div`
  position: relative;
  flex-shrink: 0;
  margin-top: -24px;
`;

const Footer = styled.div`
  flex-shrink: 0;
  margin-top: auto;
`;

const EnterButton = styled.button`
  position: absolute;
  inset: 0;
  z-index: 1;
  border: 0;
  padding: 0;
  background: none;
  -webkit-tap-highlight-color: transparent;
`;
