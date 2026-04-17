export function getFlexWidth(
  totalWidth: number,
  flex: number,
  totalFlex: number,
) {
  return totalWidth * (flex / totalFlex);
}
