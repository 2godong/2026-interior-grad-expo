// 컬러팔레트

export const colors = {
  // Primitive
  brand: {
    yellow: "#EFEDA8",
    lime: "#D4DC7D",
    limeSoft: "#E3EAA2",
    cream: "#F9FAD4",
  },

  grey: {
    0: "#F8F9FF",
    100: "#E7ECEF",
    300: "#C5C7CC",
    400: "#B3B5B8",
    700: "#49494B",
    900: "#000000",
    white: "#FFFFFF",
  },

  // Semantic
  fg: {
    primary: "#000000", // 제목과 본문 (ink)
    muted: "#49494B", // 보조 정보 - 팀 번호, 주소, 운영시간, 안내 문구 (ink-muted)
    faint: "#B3B5B8", // 비활성 표시, 장식선. 읽어야 하는 글자에는 X (ink-faint)
    onAccent: "#000000", // accent, accentSoft 위의 글자와 아이콘 (on-accent)
    inverse: "#EFEDA8", // inverse 바탕 위의 글자·아이콘 (on-inverse)
    inverseMuted: "#C5C7CC", // inverse 바탕 위의 보조 글자 (on-inverse-muted)
  },

  stroke: {
    subtle: "#C5C7CC", // 카드 테두리와 구분선, 장식용 구분에만 (line)
    strong: "#49494B", // 버튼·토글·마커 등 컨트롤의 1px 테두리 (line-strong)
    inverse: "#EFEDA8", // inverse 바탕 위의 선 (on-inverse)
  },

  bg: {
    neutral: "#F8F9FF", // 페이지 바탕 (surface)
    raised: "#FFFFFF", // 카드, 다이얼로그, 헤더, 버튼 바탕 (surface-raised)
    sunken: "#E7ECEF", // 이미지 자리, 썸네일 자리, 도면 바탕 (surface-sunken)
    accent: "#D4DC7D", // 재생 중 마커, 재생 진행, 활성 상태의 면 (accent)
    accentSoft: "#E3EAA2", // 현재 재생 중 카드의 바탕 (accent-soft)
    highlight: "#EFEDA8", // 테이프 그래픽의 면, 강조 글자 뒤 바탕 (highlight)
    highlightSoft: "#F9FAD4", // 안내 문구의 옅은 바탕 (highlight-soft)
    inverse: "#000000", // 스플래시 바탕, 주요 버튼의 면 (inverse-surface)
    inverseRaised: "#49494B", // 주요 버튼의 눌림 상태 (inverse-surface-raised)
    scrim: "rgba(0, 0, 0, 0.33)", // 다이얼로그 뒤 화면 가림 (scrim)
  },
} as const;

export type ColorsType = typeof colors;
