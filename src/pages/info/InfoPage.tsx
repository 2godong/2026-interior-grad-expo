import { useEffect, useRef, useState } from "react";
import { BackHeader } from "@/components/layout/Header";
import { getThemeMode } from "@/styles/themeMode";
import mainPoster from "@/assets/onboarding/main_poster.webp";
import subPoster from "@/assets/onboarding/sub_poster.webp";
import * as S from "./InfoPage.styles";

const posters = { light: mainPoster, dark: subPoster } as const;

const guides = [
  "전시회 도면에서 팀 번호를 누르면\n해당 팀의 오디오 도슨트가 재생됩니다.",
  "프로젝트 리스트에서 모든 작품을 차례로 볼 수 있으며 작품을 누르면 사진과 설명을 함께 볼 수 있습니다.",
];

const EASTER_EGG_CLICKS = 8;
const EASTER_EGG_DURATION = 3000;

export default function InfoPage() {
  const clickCount = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  const handleFooterClick = () => {
    clickCount.current += 1;
    if (clickCount.current < EASTER_EGG_CLICKS) return;

    clickCount.current = 0;
    setShowEasterEgg(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(
      () => setShowEasterEgg(false),
      EASTER_EGG_DURATION,
    );
  };

  return (
    <S.Page>
      <BackHeader subtitle="Exhibition Info" title="전시 정보" />

      <S.Poster
        src={posters[getThemeMode()]}
        alt="사이는 공간: (비어 있는 곳)이 아니다 전시 포스터"
      />

      <S.Titles>
        <S.Title>사이는 공간: (비어 있는 곳)이 아니다</S.Title>
        <S.EnTitle>The In-Between Is Not a Void</S.EnTitle>
      </S.Titles>

      <S.Table>
        <S.Row>
          <S.Label>기간</S.Label>
          <S.Value>2026.10.30 — 11.04</S.Value>
        </S.Row>
        <S.Row>
          <S.Label>운영시간</S.Label>
          <S.Value>
            <S.Hours>
              <span>10/30~11/03</span>
              <span>10:00 — 18:00</span>
              <span>11/04</span>
              <span>10:00 — 14:00</span>
            </S.Hours>
          </S.Value>
        </S.Row>
        <S.Row>
          <S.Label>장소</S.Label>
          <S.Value>
            스페이스 소포라 갤러리 B1
            <br />
            서울특별시 중구 덕수궁길 114
          </S.Value>
        </S.Row>
        <S.Row>
          <S.Label>주최</S.Label>
          <S.Value>
            덕성여자대학교 실내디자인전공
            <br />제 61회 졸업전시회
          </S.Value>
        </S.Row>
      </S.Table>

      <S.Guide>
        <S.GuideLabel>GUIDE</S.GuideLabel>
        <S.GuideList>
          {guides.map((text) => (
            <S.GuideItem key={text}>{text}</S.GuideItem>
          ))}
        </S.GuideList>
      </S.Guide>

      <S.Footer onClick={handleFooterClick}>
        DSID 덕성여자대학교 실내디자인전공 졸업전시회 x 덕성여자대학교
        멋쟁이사자처럼
        {showEasterEgg && <S.EasterEgg>SYSR</S.EasterEgg>}
      </S.Footer>
    </S.Page>
  );
}
