import { NavLink, useLocation, useNavigate } from "react-router";
import styled, { css } from "styled-components";
import { paths } from "@/paths";
import { layout } from "@/styles/media";

const GALLERY = "Space Sophora Gallery B1";

// 헤더1: 도면·리스트 페이지. 오른쪽에 도면/리스트 전환 탭
export function TabHeader({ title }: { title: string }) {
  return (
    <Bar>
      <Titles>
        <Subtitle>{GALLERY}</Subtitle>
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

// 헤더2: 상세보기·전시 정보 페이지. 왼쪽 뒤로가기, 오른쪽 정렬 제목
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
