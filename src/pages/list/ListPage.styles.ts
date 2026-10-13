import styled from "styled-components";
import { themes } from "../../styles/theme";
import { getThemeMode } from "../../styles/themeMode";

// 재생 중일 때만 오디오바에 가려지지 않도록 아래 여백
export const ListPage = styled.div<{ $bottomSpace?: number }>`
  padding-bottom: ${({ $bottomSpace = 0 }) => $bottomSpace}px;
`;

export const List = styled.div`
  border-top: 1.2px solid ${themes[getThemeMode()].colors.stroke.divider};
  border-bottom: 1.2px solid ${themes[getThemeMode()].colors.stroke.divider};
`;
