import { css } from "styled-components";
import { colors } from "../lib/colorPalette";

const family = {
  base: '"A2Z", -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif',
} as const;

// 크기 / 행간 · 굵기 · 자간
export const fonts = {
  family,

  // 01 포스터 타이포 — 브랜드 표현에만 사용. 작은 UI를 이 크기로 대체하지 않는다.
  display: css`
    font-size: 40px;
    line-height: 48px;
    font-weight: 300;
    letter-spacing: 0.12em;
  `, // 스플래시 전시 타이틀. 가는 획과 넓은 자간, 음절 단위 세로·분절 배치
  date: css`
    font-size: 32px;
    line-height: 36px;
    font-weight: 300;
    letter-spacing: -0.02em;
  `, // 전시 기간. 가늘고 큰 문자로 선형 프레임 안에 배치
  slogan: css`
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    font-style: italic;
  `, // 영문 전시명. 스플래시와 전시 정보에서 한 번만 사용

  // 02 UI 타이포 — 별도 표기 없으면 자간 0, 정체(normal)
  heading: css`
    font-size: 20px;
    line-height: 28px;
    font-weight: 700;
  `, // 화면 첫 제목. 전시명·작품명·오류 화면 제목
  title: css`
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
  `, // 섹션 제목과 다이얼로그 제목
  nav: css`
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
  `, // 상단 바에 표시하는 화면 이름
  body: css`
    font-size: 14px;
    line-height: 21px;
    font-weight: 400;
  `, // 본문·작품 설명·목록 작품명
  label: css`
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
  `, // 버튼과 링크의 행동 이름
  pill: css`
    font-size: 13px;
    line-height: 16px;
    font-weight: 500;
  `, // 뷰 전환과 상태 알약
  caption: css`
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
  `, // 팀 번호·주소·운영시간·재생 시간·캡션
  numeral: css`
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  `, // 두 자리 팀 마커. 0을 생략하지 않고 숫자 폭을 고정
} as const;

export const theme = {
  colors,
  fonts,
} as const;

export type ThemeType = typeof theme;
