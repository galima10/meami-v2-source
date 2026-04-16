import { useIsFocused } from "@react-navigation/native";

export function FocusGate({ children }: { children: React.ReactNode }) {
  const isFocused = useIsFocused();

  if (!isFocused) return null;

  return <>{children}</>;
}
