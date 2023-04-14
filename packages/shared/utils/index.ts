export function moveUpByArr(arr: any[], index: number) {
  if (index === 0) return arr;
  const result = [...arr];
  result.splice(index - 1, 0, result.splice(index, 1)[0]);
  return result;
}

export function moveDownByArr(arr: any[], index: number) {
  if (index === arr.length - 1) return arr;
  const result = [...arr];
  result.splice(index + 1, 0, result.splice(index, 1)[0]);
  return result;
}

export function moveTopByArr(arr: any[], index: number) {
  if (index === 0) return arr;
  const result = [...arr];
  result.unshift(result.splice(index, 1)[0]);
  return result;
}

export function moveBottomByArr(arr: any[], index: number) {
  if (index === arr.length - 1) return arr;
  const result = [...arr];
  result.push(result.splice(index, 1)[0]);
  return result;
}

export function isFirstByArr(arr: any[], index: number) {
  return index === 0;
}

export function isLastByArr(arr: any[], index: number) {
  return index === arr.length - 1;
}

export * from "./db";
