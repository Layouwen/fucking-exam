export function add(a: number, b: number) {
  return a + b;
}

export * from "./response";
export * from "./getProxyUrl";

export { default as jwtUtil } from "./jwtUtil";
export { default as prisma } from "./db";
