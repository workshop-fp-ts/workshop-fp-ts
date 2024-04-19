// Voici par exemple comment importer la boîte à outil "Array" de fp-ts
import * as A from "fp-ts/Array";
import * as Mo from "fp-ts/Monoid";
import { pipe } from "fp-ts/function";
import { MonoidSum } from "fp-ts/number";
import { describe, expect, it } from "vitest";

/**
 * https://gcanti.github.io/fp-ts/modules/Array.ts.html
 */
describe("Array", () => {
  it("fp-ts functions are curried", () => {
    const input = [1, 2, 3];
    const double = (i: number) => i * 2;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const result = A.map(double)(input);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(result).toEqual([2, 4, 6]);
  });

  it("use pipe for better readability", () => {
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

  it("check some items of an array", () => {
    const input = [1, 2, 3];
    const isOdd = (i: number) => i % 2 !== 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const hasOddValue = pipe(input, A.some(isOdd));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(hasOddValue).toEqual(true);
  });

  it("check every items of an array", () => {
    const input = [1, 3, 5];
    const isOdd = (i: number) => i % 2 !== 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const hasOnlyOddValues = pipe(input, A.every(isOdd));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(hasOnlyOddValues).toEqual(true);
  });

  it("flatMap an array", () => {
    const input = [1, 2, 3];
    const clone = (i: number) => [i, i];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, A.flatMap(clone));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual([1, 1, 2, 2, 3, 3]);
  });

  it("reduce an array", () => {
    const input = [1, 2, 3];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const sum = A.reduce(0, (a: number, b: number) => a + b);
    // Alternative solution
    // const sum = Mo.concatAll(MonoidSum);
    const resultWithPipe = pipe(input, sum, (total) => ({ total }));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual({ total: 6 });
  });
});
