export const paths = {
  onboarding: "/",
  map: "/map",
  list: "/list",
  docent: (teamId: string) => `/docent/${teamId}`,
  info: "/info",
} as const;
