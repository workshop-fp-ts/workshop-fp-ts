import { pipe } from "fp-ts/function";
import { expect, describe, it } from "vitest";
import { TO_REPLACE } from "./utils";
import * as A from "fp-ts/Array";

/**
 * In this section, we will cover the pipe function that we will use a lot in this workshop
 * and some basic Array functions. You can learn about them in the documentation:
 * https://gcanti.github.io/fp-ts/modules/Array.ts.html
 */
describe("Basics", () => {
  it("fp-ts functions are curried", () => {
    const input = [1, 2, 3];
    const double = (i: number) => i * 2;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const result = A.map(double);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(result).toEqual([2, 4, 6]);
  });

  it.todo("pipe function allows you to process data sequentially", () => {
    const input = "20";
    const parseNumber = (raw: string) => parseInt(raw, 10);

    const result = parseNumber(input);

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual(result);
  });

  it.todo("use pipe with curried functions for better readability", () => {
    const input = [1, 2, 3];
    const double = (i: number) => i * 2;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual([2, 4, 6]);
  });

  it.todo("filter an array", () => {
    const input = [1, 2, 3];
    const isOdd = (i: number) => i % 2 !== 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual([1, 3]);
  });

  it.todo("flatMap an array", () => {
    const input = [1, 2, 3];
    const clone = (i: number) => [i, i];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual([1, 1, 2, 2, 3, 3]);
  });
});
