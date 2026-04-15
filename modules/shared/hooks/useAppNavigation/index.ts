import { useRouter, type Href } from "expo-router";

export function useAppNavigation(
  routeAction: "replace" | "push" | "back" = "replace",
) {
  const router = useRouter();
  function handleNavigate(route: Href | undefined) {
    if (!route) return;
    if (routeAction === "push") router.push(route);
    else if (routeAction === "back") router.back();
    else router.replace(route);
  }
  return { handleNavigate };
}
