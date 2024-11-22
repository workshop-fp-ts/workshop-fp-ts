import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import { describe, expect, it } from "vitest";

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

    const result = A.map(double)(input);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(result).toEqual([2, 4, 6]);
  });

  it("pipe function allows you to process data sequentially", () => {
    const input = "20";
    const parseNumber = (raw: string) => parseInt(raw, 10);

    const result = parseNumber(input);

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, parseNumber);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual(result);
  });

  it("use pipe with curried functions for better readability", () => {
    const input = [1, 2, 3];
    const double = (i: number) => i * 2;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, A.map(double));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual([2, 4, 6]);
  });

  it("filter an array", () => {
    const input = [1, 2, 3];
    const isOdd = (i: number) => i % 2 !== 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, A.filter(isOdd));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual([1, 3]);
  });

  it("flatMap an array", () => {
    const input = [1, 2, 3];
    const clone = (i: number) => [i, i];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, A.flatMap(clone));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual([1, 1, 2, 2, 3, 3]);
  });
});
