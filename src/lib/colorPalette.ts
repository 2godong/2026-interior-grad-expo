// 컬러팔레트

// Primitive — 모드와 무관한 원색. 컴포넌트에서 직접 쓰지 말고 아래 시맨틱 토큰을 통해 사용
export const palette = {
  brand: {
    yellow: "#EFEDA8",
    lime: "#D4DC7D",
    limeSoft: "#E3EAA2",
    cream: "#F9FAD4",
  },

  grey: {
    0: "#F8F9FF",
    50: "#F7F7F7",
    100: "#E7ECEF",
    300: "#C5C7CC",
    400: "#B3B5B8",
    700: "#49494B",
    800: "#262624",
    900: "#000000",
    white: "#FFFFFF",
  },

  blue: {
    100: "#DBE9FF",
    200: "#D4E4FA",
  },

  alpha: {
    black33: "rgba(0, 0, 0, 0.33)",
  },
} as const;

const { brand, grey, alpha } = palette;

// Semantic — 다크(포스터) 버전이 기준, 라이트 버전은 같은 키에 값만 바뀜
export const darkColors = {
  fg: {
    primary: grey[50], // 본문 — 작품명, 작품 설명, 표 내용, 가이드 문구
    accent: brand.limeSoft, // 화면 제목·영문 부제, 뒤로가기, 탭, 안내 문구, 하단 링크, 푸터
    muted: brand.yellow, // MEDIA ZONE 등 존 라벨
    active: brand.limeSoft, // 리스트에서 재생 중인 행의 작품명·정보
    onMarker: grey[800], // 채운 팀 마커 안의 번호
    onMarkerActive: brand.limeSoft, // 재생 중 팀 마커 안의 번호
    onTab: grey[800], // 활성 탭(도면/리스트) 글자
    onPanel: grey[800], // 노란 패널(하단 재생 바, 오디오 플레이어) 위 글자
    onPanelIcon: brand.yellow, // 재생 아이콘 박스·정지 버튼 안 아이콘
    poster: brand.lime, // 온보딩 포스터 위 글자 (하단 전시 기간·장소·주최)
  },

  stroke: {
    divider: brand.limeSoft, // 헤더 아래 선, 표·행 구분선(리스트 행 사이 옅은 선 포함), 이전/다음 구분선
    plan: brand.yellow, // 도면 벽선, 입구 화살표, 영문 타이포
    control: brand.yellow, // 줌(-, +, 전체화면) 버튼 테두리
    marker: grey[50], // 테두리만 있는 팀 마커
    markerActive: brand.limeSoft, // 재생 중 팀 마커 테두리
    indicator: brand.limeSoft, // 재생 중 사각형 테두리
    panel: grey[800], // 노란 패널과 그 안 버튼 테두리
  },

  bg: {
    page: grey[700], // 페이지·도면 바탕
    backdrop: brand.lime, // 태블릿·PC에서 폰 프레임 양옆 배경
    placeholder: grey[400], // 작품 이미지 자리
    handle: grey[400], // 바텀시트 손잡이
    marker: brand.limeSoft, // 채운 팀 마커
    markerActive: "transparent", // 재생 중 팀 마커
    tab: brand.limeSoft, // 활성 탭(도면/리스트)
    indicator: grey[800], // 재생 중 옆 사각형
    panel: brand.yellow, // 하단 재생 바, 전시 정보 칸, 오디오 플레이어
    panelAction: brand.lime, // 노란 패널 안 버튼(전시 정보)
    panelIcon: grey[800], // 재생 아이콘 박스, 정지 버튼
    scrim: alpha.black33, // 작품 대표 이미지 위 어둡게 덮는 층
    card: grey.white,
  },
} as const;

type ColorTokens<T> = { [K in keyof T]: { [P in keyof T[K]]: string } };
export type ColorsType = ColorTokens<typeof darkColors>;

export const lightColors: ColorsType = {
  fg: {
    primary: grey[800],
    accent: grey[800],
    muted: grey[700],
    active: brand.lime,
    onMarker: brand.yellow,
    onMarkerActive: grey[800],
    onTab: brand.yellow,
    onPanel: grey[800],
    onPanelIcon: brand.yellow,
    poster: brand.yellow,
  },

  stroke: {
    divider: grey[800],
    plan: grey[800],
    control: grey[800],
    marker: grey[800],
    markerActive: grey[800],
    indicator: grey[800],
    panel: grey[800],
  },

  bg: {
    page: grey[50],
    backdrop: brand.yellow,
    placeholder: grey[400],
    handle: grey[300],
    marker: grey[800],
    markerActive: brand.yellow,
    tab: grey[800],
    indicator: brand.yellow,
    panel: brand.yellow,
    panelAction: grey[50],
    panelIcon: grey[800],
    scrim: "transparent",
    card: grey.white,
  },
};
