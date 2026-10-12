import styled from "styled-components";
import { themes } from "../../styles/theme";

export const ListContainer = styled.div`
  padding: 23px 20px;
  border-top: 1px solid ${themes.light.colors.stroke.divider};
  border-bottom: 1px solid ${themes.light.colors.stroke.divider};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
`;

export const NumBox = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${themes.light.colors.fg.onMarkerActive};
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const Num = styled.div`
  color: ${({ theme }) => theme.colors.bg.card};
`;

export const TitleBox = styled.div`
  gap: 14px;
  display: flex;
  flex-direction: column;
`;
export const Title = styled.div``;
export const TeamName = styled.div``;
export const ZoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: end;
`;
export const Zone = styled.div``;
export const Time = styled.div``;
