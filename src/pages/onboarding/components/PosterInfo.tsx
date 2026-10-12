import styled from "styled-components";
import { gutterX } from "@/styles/media";
import type { ThemeMode } from "@/styles/themeMode";
import logoMain from "@/assets/onboarding/ds-logo-main.png";
import logoSub from "@/assets/onboarding/ds-logo-sub.png";

const logos = { light: logoMain, dark: logoSub } as const;

export default function PosterInfo({ mode }: { mode: ThemeMode }) {
  return (
    <Wrap>
      <Exhibition>
        2026.10.30 — 11.04
        <br />
        Space Sophora Gallery B1
      </Exhibition>
      <Hosts>
        <Host>
          <Logo src={logos[mode]} alt="덕성여자대학교 로고" />
          <span>
            DSID 덕성여자대학교
            <br />
            실내디자인전공 졸업전시회
          </span>
        </Host>
        <Times aria-hidden>×</Times>
        <span>
          덕성여자대학교
          <br />
          멋쟁이사자처럼
        </span>
      </Hosts>
    </Wrap>
  );
}

const Wrap = styled.footer`
  ${gutterX}
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 12px;
  padding-bottom: calc(23px + env(safe-area-inset-bottom));
  color: ${({ theme }) => theme.colors.fg.poster};

  @media (max-height: 700px) {
    gap: 18px;
    padding-bottom: calc(16px + env(safe-area-inset-bottom));
  }
`;

const Exhibition = styled.p`
  margin: 0;
  font-size: 20px;
  line-height: 24px;
  font-weight: 300;
`;

const Hosts = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  line-height: 16px;
  font-weight: 300;
  white-space: nowrap;
`;

const Host = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
`;

const Times = styled.span`
  font-size: 13px;
`;
