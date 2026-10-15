import styled from "styled-components";
import { themes } from "../../styles/theme";
import { getThemeMode } from "../../styles/themeMode";

// 오디오바가 있으면 가려지지 않을 만큼, 없으면 기본 여백만큼 아래를 띄운다
export const ListPage = styled.div<{ $bottomSpace?: number }>`
  padding-bottom: ${({ $bottomSpace = 0 }) => $bottomSpace}px;
`;

export const List = styled.div`
  border-top: 1.2px solid ${themes[getThemeMode()].colors.stroke.divider};
  border-bottom: 1.2px solid ${themes[getThemeMode()].colors.stroke.divider};
`;
