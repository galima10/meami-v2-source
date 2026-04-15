import { useRouter, type Href } from "expo-router";

export function useAppNavigation() {
  const router = useRouter();
  function handleNavigate(
    route: Href | undefined,
    routeAction: "replace" | "push" | "back" = "replace",
  ) {
    if (routeAction === "push") {
      if (!route) return;
      router.push(route);
    } else if (routeAction === "back") {
      router.back();
    } else {
      if (!route) return;
      router.replace(route);
    }
  }
  return { handleNavigate };
}
