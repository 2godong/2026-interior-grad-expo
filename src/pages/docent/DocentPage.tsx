import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import { getPrevNext, getWork, zoneLabel } from "@/constants/projects";
import AudioPlayer from "@/components/docent/AudioPlayer";
import { BackHeader } from "@/components/layout/Header";
import { paths } from "@/paths";
import * as S from "./DocentPage.styles";

export default function DocentPage() {
  const { teamId, zone } = useParams();
  const work = getWork(teamId, zone);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // 스크롤이 시작되면 사진 위 번호를 숨기고,
  // 시트가 대표 이미지의 작품명을 덮으면 시트 상단에 번호·작품명 표시
  useEffect(() => {
    const update = () => {
      const hero = heroRef.current;
      const title = heroTitleRef.current;
      const sheet = sheetRef.current;
      if (!hero || !title || !sheet) return;
      const sheetTop = sheet.getBoundingClientRect().top;
      setScrolled(sheetTop < hero.getBoundingClientRect().bottom - 1);
      setCollapsed(sheetTop < title.getBoundingClientRect().bottom);
    };
    update();
    // 실제 스크롤은 AppLayout의 스크롤 컨테이너에서 일어나므로 캡처로 받는다
    document.addEventListener("scroll", update, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", update);
    return () => {
      document.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("resize", update);
    };
  }, [teamId, zone]);

  if (!work) return <Navigate to={paths.list} replace />;

  const { prev, next } = getPrevNext(work);
  const num = work.teamId.padStart(2, "0");

  return (
    <S.Page>
      <BackHeader title="도슨트 오디오 상세보기" fallback={paths.list} />

      <S.Hero ref={heroRef} $image={work.thumbnail}>
        <S.HeroBadge $hidden={scrolled}>{num}</S.HeroBadge>
        <S.HeroTitle ref={heroTitleRef}>{work.title}</S.HeroTitle>
      </S.Hero>

      <S.Sheet ref={sheetRef}>
        {/* 시트가 헤더에 닿으면 이 영역은 고정되고 아래 내용만 스크롤 */}
        <S.SheetTop>
          <S.Handle />

          <S.SheetTitle $visible={collapsed} aria-hidden={!collapsed}>
            <S.SheetTitleInner>
              <S.Badge>{num}</S.Badge>
              <S.SheetTitleText>{work.title}</S.SheetTitleText>
            </S.SheetTitleInner>
          </S.SheetTitle>

          <AudioPlayer key={`${work.teamId}-${work.zone}`} src={work.audio} />
        </S.SheetTop>

        <S.InfoTable>
          <S.InfoRow>
            <S.InfoLabel>전시 위치</S.InfoLabel>
            <S.InfoValue>{zoneLabel[work.zone]}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>팀명</S.InfoLabel>
            <S.InfoValue>{work.members.join(", ")}</S.InfoValue>
          </S.InfoRow>
        </S.InfoTable>

        <S.DescLabel>작품 설명</S.DescLabel>
        {work.content?.length ? (
          work.content.map((block, i) =>
            block.type === "text" ? (
              <S.Paragraph key={i}>{block.value}</S.Paragraph>
            ) : (
              <S.Image key={i} src={block.src} alt="" />
            ),
          )
        ) : (
          <S.Paragraph>작품 설명이 준비 중이에요.</S.Paragraph>
        )}
      </S.Sheet>

      <S.Bottom>
        <S.PrevNext>
          <S.NavItem to={`/docent/${prev.teamId}/${prev.zone}`}>
            <S.NavSub>PREV {prev.teamId.padStart(2, "0")}</S.NavSub>
            <S.NavTitle>{prev.title}</S.NavTitle>
          </S.NavItem>
          <S.NavItem to={`/docent/${next.teamId}/${next.zone}`} $align="right">
            <S.NavSub>NEXT {next.teamId.padStart(2, "0")}</S.NavSub>
            <S.NavTitle>{next.title}</S.NavTitle>
          </S.NavItem>
        </S.PrevNext>

        <S.FooterLinks>
          <S.FooterLink as={Link} to={paths.map}>
            전시장 도면으로
          </S.FooterLink>
          <S.FooterLink as={Link} to={paths.list}>
            프로젝트 리스트로
          </S.FooterLink>
        </S.FooterLinks>
      </S.Bottom>
    </S.Page>
  );
}
