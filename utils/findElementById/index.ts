export function findElementById(elementId: number, elements: any[]) {
  const elementFound = elements.find((e) => e.id === elementId);
  return elementFound;
}
