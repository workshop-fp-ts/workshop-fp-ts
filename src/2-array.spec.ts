import { pipe } from "fp-ts/function";
import { expect, describe, it } from "vitest";
import { TO_REPLACE } from "./utils";

describe.skip("Array", () => {
  it("should map with pipe", () => {
    const input = [1, 2, 3];
    const result = input.map((i) => i + 42);

    const resultWithPipe = pipe(input, TO_REPLACE);

    expect(resultWithPipe).toEqual(result);
  });
});
