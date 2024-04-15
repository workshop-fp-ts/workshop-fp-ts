// Voici par exemple comment importer la boîte à outil "Array" de fp-ts
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import { expect, describe, it } from "vitest";
import { TO_REPLACE } from "./utils";

/**
 * https://gcanti.github.io/fp-ts/modules/Array.ts.html
 */
describe("Array", () => {
  it.todo("fp-ts functions are curried", () => {
    const input = [1, 2, 3];
    const double = (i: number) => i * 2;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const result = A.map(double);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(result).toEqual([2, 4, 6]);
  });

  it.todo("use pipe for better readability", () => {
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

  it.todo("check some items of an array", () => {
    const input = [1, 2, 3];
    const isOdd = (i: number) => i % 2 !== 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const hasOddValue = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(hasOddValue).toEqual(true);
  });

  it.todo("check every items of an array", () => {
    const input = [1, 3, 5];
    const isOdd = (i: number) => i % 2 !== 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const hasOnlyOddValues = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(hasOnlyOddValues).toEqual(true);
  });

  it.todo("flatMap an array", () => {
    const input = [1, 2, 3];
    const clone = (i: number) => [i, i];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual([1, 1, 2, 2, 3, 3]);
  });

  it.todo("reduce an array", () => {
    const input = [1, 2, 3];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE, (total) => ({
      total,
    }));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual({ total: 6 });
  });
});
