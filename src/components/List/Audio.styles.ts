import styled from "styled-components";
import { themes } from "../../styles/theme";
import { getThemeMode } from "../../styles/themeMode";

const { colors, fonts } = themes[getThemeMode()];

const BAR_HEIGHT = 96;
const BAR_BOTTOM = 19;
// 오디오바가 떠 있을 때 리스트 아래에 둘 여백 (바 높이 + 바닥 간격 + 바 위 간격)
export const AUDIO_BAR_SPACE = BAR_HEIGHT + BAR_BOTTOM * 2;

export const AudioContainer = styled.div`
  position: fixed;
  bottom: ${BAR_BOTTOM}px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 38px);
  max-width: calc(430px - 38px);
  z-index: 10;

  box-sizing: border-box;
  height: ${BAR_HEIGHT}px;
  padding: 18px 19px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: ${colors.bg.panel};
  border: 1px solid ${colors.stroke.panel};
  color: ${colors.fg.onPanel};
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  background: ${colors.bg.panelIcon};
`;

export const PlayIcon = styled.img`
  width: 60px;
  height: 60px;
`;

export const ContentWr = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const ContentTitle = styled.div`
  ${fonts.caption}
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Dot = styled.span``;

export const Title = styled.div`
  /* ${fonts.heading} */
  font-size: 18px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TimeWr = styled.div`
  ${fonts.body}
  font-variant-numeric: tabular-nums;
`;

export const Detail = styled.div`
  ${fonts.body}
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: flex-end;
  padding-bottom: 2px;
  border-bottom: 1px solid ${colors.stroke.panel};
  color: ${colors.fg.onPanel};
  text-decoration: none;
  flex-shrink: 0;
`;

export const Arrow = styled.span``;
