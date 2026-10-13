import { Link } from "react-router";
import styled from "styled-components";
import { AudioContainer } from "@/components/List/Audio.styles";
import { paths } from "@/paths";

// 도면에서 재생 중인 도슨트가 없을 때 오디오바 자리에 보이는 전시 정보 칸
export default function ExhibitionPanel() {
  return (
    <Panel>
      <Title>The In-Between Is Not a Void</Title>
      <Sub>사이는 공간: (비어 있는 곳)이 아니다</Sub>
      <Period>2026.10.30 — 11.04</Period>
      <InfoLink to={paths.info}>
        전시 정보 <span aria-hidden>→</span>
      </InfoLink>
    </Panel>
  );
}

// 제목은 한 줄 전체, 아래 왼쪽에 부제·기간, 오른쪽 아래에 전시 정보 버튼
const Panel = styled(AudioContainer)`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto 1fr;
  gap: 0 12px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.title}
  grid-column: 1 / -1;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Sub = styled.p`
  ${({ theme }) => theme.fonts.caption}
  grid-column: 1;
  margin: 0;
  font-weight: 400;
`;

const Period = styled(Sub)`
  align-self: end;
`;

const InfoLink = styled(Link)`
  ${({ theme }) => theme.fonts.caption}
  grid-column: 2;
  grid-row: 3;
  align-self: end;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  padding: 2px 12px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.panel};
  background: ${({ theme }) => theme.colors.bg.panelAction};
  color: inherit;
  text-decoration: none;
`;
