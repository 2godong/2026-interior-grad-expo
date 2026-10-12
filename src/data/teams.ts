// 졸업전시 준비위원회 도면 기준 참여 팀
export const teams = {
  "01": ["김다빈", "김도희", "안승희"],
  "02": ["이주희", "이채린", "최예슬"],
  "03": ["강지인", "안수연"],
  "04": ["김소은", "안채연", "차수연"],
  "05": ["구세연", "김성은", "박윤지"],
  "06": ["문가은", "문성희"],
  "07": ["김다연", "문세희", "최예림"],
  "08": ["이다빈"],
  "09": ["김정연", "이다솔", "조민서"],
  "10": ["고예서", "이수민"],
  "11": ["배수영", "정윤서"],
} as const;

export type TeamId = keyof typeof teams;

export const isTeamId = (value: string | null): value is TeamId => value !== null && value in teams;
