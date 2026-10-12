import styled from "styled-components";
import { themes } from "../../styles/theme";

type Zone = "model" | "media";
const colors = themes.light.colors;

export const ListContainer = styled.div`
  padding: 23px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:nth-child(odd) {
    border-bottom: 1px solid ${themes.light.colors.bg.placeholder};
  }

  &:nth-child(even) {
    border-bottom: 1.2px solid ${themes.light.colors.stroke.divider};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const NumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
`;

export const NumBox = styled.div<{ $zone: Zone }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  box-sizing: border-box;

  background: ${({ $zone }) =>
    $zone === "model" ? colors.bg.marker : "transparent"};
  border: 1px solid
    ${({ $zone }) =>
      $zone === "model" ? colors.bg.marker : colors.stroke.marker};
`;

export const Num = styled.span<{ $zone: Zone }>`
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: ${({ $zone }) =>
    $zone === "model" ? colors.bg.card : colors.fg.primary};
  ${themes.light.fonts.body}
`;

export const TitleBox = styled.div`
  gap: 14px;
  display: flex;
  flex-direction: column;
`;
export const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
export const TeamName = styled.div`
  ${themes.light.fonts.body}
`;
export const ZoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: end;
`;
export const Zone = styled.div`
  ${themes.light.fonts.body}
`;
export const Time = styled.div`
  ${themes.light.fonts.body}
`;
