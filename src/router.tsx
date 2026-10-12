import { createBrowserRouter, Navigate } from "react-router";
import AppLayout from "@/components/layout/AppLayout";
import OnboardingPage from "@/pages/onboarding/OnboardingPage";
import MapPage from "@/pages/map/MapPage";
import ListPage from "@/pages/list/ListPage";
import DocentPage from "@/pages/docent/DocentPage";
import InfoPage from "@/pages/info/InfoPage";

// 페이지 주소는 여기서 한 번에 관리. 링크에는 문자열 대신 paths를 사용
export const paths = {
  onboarding: "/",
  map: "/map",
  list: "/list",
  docent: (teamId: string) => `/docent/${teamId}`,
  info: "/info",
} as const;

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: paths.onboarding, element: <OnboardingPage /> },
      { path: paths.map, element: <MapPage /> }, // 전시장 도면
      { path: paths.list, element: <ListPage /> }, // 프로젝트 리스트
      { path: "/docent/:teamId", element: <DocentPage /> }, // 도슨트 오디오 상세
      { path: paths.info, element: <InfoPage /> }, // 전시 정보
      { path: "*", element: <Navigate to={paths.onboarding} replace /> }, // 없는 주소는 처음으로
    ],
  },
]);
