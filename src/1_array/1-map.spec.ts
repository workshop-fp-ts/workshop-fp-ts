import { pipe } from "fp-ts/function";
import { expect, describe, it } from "vitest";

describe("Array", () => {
  it("should map with pipe", () => {
    const input = [1, 2, 3];
    const result = input.map((i) => i + 42);

    const resultWithPipe = pipe(input);

    expect(resultWithPipe).toEqual(result);
  });
});
