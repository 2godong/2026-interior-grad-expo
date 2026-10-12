import { createBrowserRouter, Navigate } from "react-router";
import AppLayout, { type RouteHandle } from "@/components/layout/AppLayout";
import OnboardingPage from "@/pages/onboarding/OnboardingPage";
import MapPage from "@/pages/map/MapPage";
import ListPage from "@/pages/list/ListPage";
import DocentPage from "@/pages/docent/DocentPage";
import InfoPage from "@/pages/info/InfoPage";
import { paths } from "@/paths";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: paths.onboarding,
        element: <OnboardingPage />,
        handle: { fullBleed: true } satisfies RouteHandle,
      },
      { path: paths.map, element: <MapPage /> },
      { path: paths.list, element: <ListPage /> },
      // { path: "/docent/:teamId", element: <DocentPage /> },
      { path: "/docent/:teamId/:zone", element: <DocentPage /> },
      { path: paths.info, element: <InfoPage /> },
      { path: "*", element: <Navigate to={paths.onboarding} replace /> },
    ],
  },
]);
