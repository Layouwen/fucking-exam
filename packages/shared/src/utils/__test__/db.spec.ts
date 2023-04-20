import { omit } from "../db";

describe("omit", () => {
  it("object", () => {
    const a = { a: 1, b: { c: 1, d: 1 } };
    const b = omit(a, ["a", "b.c"]);
    expect(b).toEqual({ b: { d: 1 } });
  });
});
