import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import styled, { css, keyframes } from "styled-components";
import { paths } from "@/paths";
import { layout } from "@/styles/media";

const GALLERY = "Space Sophora Gallery B1";
const INFO_HINT_KEY = "infoHintSeen";
const INFO_HINT_DURATION = 3000;

function useInfoHint() {
  const [show, setShow] = useState(() => {
    try {
      return !localStorage.getItem(INFO_HINT_KEY);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!show) return;
    try {
      localStorage.setItem(INFO_HINT_KEY, "1");
    } catch {
      // 저장이 막혀 있으면 다음 방문에도 다시 보임
    }
    const timer = setTimeout(() => setShow(false), INFO_HINT_DURATION);
    return () => clearTimeout(timer);
  }, [show]);

  return [show, () => setShow(false)] as const;
}

export function TabHeader({ title }: { title: string }) {
  const [showHint, hideHint] = useInfoHint();

  return (
    <Bar>
      <Titles>
        <SubtitleRow>
          <Subtitle>{GALLERY}</Subtitle>
          <InfoAnchor>
            <InfoLink to={paths.info} aria-label="전시 정보">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7.2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path d="M8 7v4.5" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="8" cy="4.6" r="0.9" fill="currentColor" />
              </svg>
            </InfoLink>
            {showHint && (
              <Bubble role="status" onClick={hideHint}>
                전시 정보는 여기에서 볼 수 있어요
              </Bubble>
            )}
          </InfoAnchor>
        </SubtitleRow>
        <Title>{title}</Title>
      </Titles>
      <Tabs aria-label="보기 전환">
        <Tab to={paths.map}>도면</Tab>
        <Tab to={paths.list}>리스트</Tab>
      </Tabs>
    </Bar>
  );
}

type BackHeaderProps = {
  title: string;
  subtitle?: string;
  fallback?: string;
};

export function BackHeader({
  title,
  subtitle = GALLERY,
  fallback = paths.map,
}: BackHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.key === "default") navigate(fallback, { replace: true });
    else navigate(-1);
  };

  return (
    <Bar>
      <BackButton type="button" onClick={goBack} aria-label="뒤로 가기">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M21 12H4M11 4.5 3.5 12l7.5 7.5"
            stroke="currentColor"
            strokeWidth="2.4"
          />
        </svg>
      </BackButton>
      <Titles $align="right">
        <Subtitle>{subtitle}</Subtitle>
        <Title>{title}</Title>
      </Titles>
    </Bar>
  );
}

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  margin: 0 -${layout.gutter}px;
  padding: 0 ${layout.gutter}px;
  background: ${({ theme }) => theme.colors.bg.page};
  color: ${({ theme }) => theme.colors.fg.accent};

  &::after {
    content: "";
    position: absolute;
    left: ${layout.gutter}px;
    right: ${layout.gutter}px;
    bottom: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.stroke.divider};
  }
`;

const Titles = styled.div<{ $align?: "right" }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  ${({ $align }) =>
    $align === "right" &&
    css`
      align-items: flex-end;
      text-align: right;
    `}
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 16px;
  font-weight: 300;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  line-height: 28px;
  font-weight: 300;
`;

const SubtitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const InfoAnchor = styled.div`
  position: relative;
  display: flex;
`;

const InfoLink = styled(Link)`
  display: flex;
  margin: -6px;
  padding: 6px 6px 6px 10px;
  color: inherit;
  -webkit-tap-highlight-color: transparent;

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

const bubbleIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -4px); }
  to { opacity: 1; transform: translate(-50%, 0); }
`;

const Bubble = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  white-space: nowrap;
  ${({ theme }) => theme.fonts.caption};
  background: ${({ theme }) => theme.colors.bg.tab};
  color: ${({ theme }) => theme.colors.fg.onTab};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  animation: ${bubbleIn} 0.25s ease-out;

  &::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: ${({ theme }) => theme.colors.bg.tab};
  }
`;

const Tabs = styled.nav`
  display: flex;
  flex-shrink: 0;
`;

const Tab = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 12px;
  ${({ theme }) => theme.fonts.pill};
  font-weight: 400;

  &.active {
    background: ${({ theme }) => theme.colors.bg.tab};
    color: ${({ theme }) => theme.colors.fg.onTab};
  }
`;

const BackButton = styled.button`
  display: flex;
  margin-left: -4px;
  padding: 4px;
  border: 0;
  background: none;
  color: inherit;
`;
