import styled from "styled-components";
import { themes } from "../../styles/theme";
import { getThemeMode } from "../../styles/themeMode";

const { colors, fonts } = themes[getThemeMode()];

export const Player = styled.div`
  padding: 12px 14px 14px;
  background: ${colors.bg.panel};
  border: 1px solid ${colors.stroke.panel};
  color: ${colors.fg.onPanel};
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Label = styled.span`
  ${fonts.caption}
`;

export const TextButton = styled.button`
  ${fonts.caption}
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
`;

export const Body = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border: none;
  background: ${colors.bg.panelIcon};
  cursor: pointer;
`;

// 재생 중: 이퀄라이저(playIcon), 정지 중: 네모(stopIcon)
export const Icon = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

export const ProgressWrap = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Range = styled.input<{ $progress: number }>`
  width: 100%;
  height: 12px;
  margin: 0;
  appearance: none;
  background: transparent;
  cursor: pointer;

  /* 선: 지나간 부분은 진하게, 남은 부분은 얇게 */
  &::-webkit-slider-runnable-track {
    height: 2px;
    background: linear-gradient(
      to right,
      ${colors.stroke.panel} ${({ $progress }) => $progress}%,
      ${colors.bg.placeholder} ${({ $progress }) => $progress}%
    );
  }
  &::-moz-range-track {
    height: 2px;
    background: ${colors.bg.placeholder};
  }
  &::-moz-range-progress {
    height: 2px;
    background: ${colors.stroke.panel};
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 8px;
    height: 12px;
    margin-top: -5px;
    background: ${colors.fg.onPanel};
    border: none;
    border-radius: 0;
  }
  &::-moz-range-thumb {
    width: 8px;
    height: 12px;
    background: ${colors.fg.onPanel};
    border: none;
    border-radius: 0;
  }
`;

export const Times = styled.div`
  ${fonts.caption}
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-variant-numeric: tabular-nums;
`;
