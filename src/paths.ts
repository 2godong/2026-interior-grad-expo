export const paths = {
  onboarding: "/",
  map: "/map",
  list: "/list",
  docent: (teamId: string, zone: string) => `/docent/${teamId}/${zone}`,
  info: "/info",
} as const;
