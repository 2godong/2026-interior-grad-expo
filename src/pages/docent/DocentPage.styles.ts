import styled from "styled-components";
import { Link } from "react-router";
import { themes } from "../../styles/theme";
import { getThemeMode } from "../../styles/themeMode";

const { colors, fonts } = themes[getThemeMode()];

export const HEADER_HEIGHT = 80;
const HERO_HEIGHT = 220;

export const Page = styled.div`
  min-height: 100vh;
  background: ${colors.bg.page};
  color: ${colors.fg.primary};
`;

export const Hero = styled.div<{ $image?: string }>`
  position: sticky;
  top: ${HEADER_HEIGHT}px;
  height: ${HERO_HEIGHT}px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 20px;
  background: ${({ $image }) =>
    $image ? `center / cover no-repeat url(${$image})` : colors.bg.placeholder};
`;

export const HeroTitle = styled.div`
  ${fonts.heading}
  font-size: 23px;
  font-weight: 400;
  word-break: keep-all;
  text-wrap: balance;
`;

export const Badge = styled.span`
  ${fonts.body}
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  background: ${colors.bg.marker};
  color: ${colors.fg.onMarker};
`;

export const HeroBadge = styled(Badge)<{ $hidden: boolean }>`
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transition: opacity 0.2s ease;
`;

export const Sheet = styled.section`
  position: relative;
  z-index: 1;
  min-height: calc(var(--frame-height) - ${HEADER_HEIGHT}px);
  padding: 0 16px 24px;
  background: ${colors.bg.page};
  border-top: 1px solid ${colors.fg.accent};
`;

export const SheetTop = styled.div`
  position: sticky;
  top: ${HEADER_HEIGHT}px;
  z-index: 1;
  margin: 0 -16px;
  padding: 8px 16px 16px;
  background: ${colors.bg.page};
`;

export const Handle = styled.div`
  width: 32px;
  height: 3px;
  margin: 0 auto 16px;
  border-radius: 2px;
  background: ${colors.bg.handle};
`;

export const SheetTitle = styled.div<{ $visible: boolean }>`
  display: grid;
  grid-template-rows: ${({ $visible }) => ($visible ? "1fr" : "0fr")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition:
    grid-template-rows 0.2s ease,
    opacity 0.2s ease;
`;

export const SheetTitleInner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 0;
  overflow: hidden;
`;

export const SheetTitleText = styled.div`
  ${fonts.heading}
  font-size: 23px;
  font-weight: 400;
  word-break: keep-all;
  text-wrap: balance;
  margin: 10px 0;
`;

/* 정보 표 */
export const InfoTable = styled.dl`
  margin-top: 0;
  border-top: 1px solid ${colors.stroke.divider};
`;

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  padding: 12px 8px;
  border-bottom: 1px solid ${colors.fg.accent};
`;

export const InfoLabel = styled.dt`
  ${fonts.body}
`;

export const InfoValue = styled.dd`
  ${fonts.body}
  margin: 0;
`;

/* 작품 설명 */
export const DescLabel = styled.p`
  ${fonts.caption}
  margin: 16px 8px 12px;
  font-weight: 400;
`;

export const Paragraph = styled.p`
  ${fonts.body}
  margin: 0 8px 20px;
  white-space: pre-line;

  strong {
    font-weight: 600;
  }
`;

export const Image = styled.img`
  display: block;
  width: calc(100% - 16px);
  height: auto; /* 원본 비율 그대로 — 가로·세로 이미지 모두 잘리지 않음 */
  margin: 8px 8px 24px;
  background: ${colors.bg.placeholder};
`;

export const Bottom = styled.nav`
  position: sticky;
  bottom: 0;
  z-index: 2;
  padding: 0 16px 16px;
  background: ${colors.bg.page};
`;

export const PrevNext = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid ${colors.stroke.divider};
  border-bottom: 1px solid ${colors.stroke.divider};
`;

export const NavItem = styled(Link)<{ $align?: "right" }>`
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
  text-decoration: none;
  color: inherit;
  text-align: ${({ $align }) => $align ?? "left"};
  min-width: 0;

  & + & {
    border-left: 1px solid ${colors.stroke.divider};
  }
`;

export const NavSub = styled.span`
  ${fonts.caption}
`;

export const NavTitle = styled.span`
  ${fonts.body}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

export const FooterLink = styled.span`
  ${fonts.body}
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
`;
