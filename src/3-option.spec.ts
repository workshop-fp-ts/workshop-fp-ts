// Comme précemment on importe ci-dessous la boîte outil "Option" de fp-ts
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import { expect, describe, it } from "vitest";
import { TO_REPLACE } from "./utils";

/**
 * https://gcanti.github.io/fp-ts/modules/Option.ts.html
 */

describe("Option", () => {
  it.todo("You can create options of the none type", () => {
    const result = TO_REPLACE;

    expect((result as any)._tag).toEqual("None");
  });

  it.todo("You can create options of the some type", () => {
    const input = 42;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const result = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    if (O.isNone(result)) {
      throw new Error("should be a Some");
    }
    expect(result.value).toEqual(42);
  });

  it.todo("You can build an option from a possibly nullish value", () => {
    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: any) => pipe(x, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const resultFromTruthy = fn(42);
    const resultFromNull = fn(null);
    const resultFromUndefined = fn(undefined);

    expect(O.isSome(resultFromTruthy)).toEqual(true);
    expect(O.isNone(resultFromNull)).toEqual(true);
    expect(O.isNone(resultFromUndefined)).toEqual(true);
  });

  it.todo(
    "You can conditionally build a Some or None according to a predicate",
    () => {
      const isEven = (x: number) => x % 2 === 0;

      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const fn = (x: number) => pipe(x, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      const resultFromEvenNumber = fn(2);
      const resultFromOddNumber = fn(3);

      expect(O.isSome(resultFromEvenNumber)).toEqual(true);
      expect(O.isNone(resultFromOddNumber)).toEqual(true);
    }
  );

  it.todo(
    "You can extract a value in case of Some, providing a default value in case of None",
    () => {
      const isEven = (x: number) => x % 2 === 0;

      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const fn = (x: number) => pipe(x, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      const resultFromEvenNumber = fn(2);
      const resultFromOddNumber = fn(3);

      expect(resultFromEvenNumber).toEqual(2);
      expect(resultFromOddNumber).toEqual(999);
    }
  );

  it.todo(
    "You can extract a value in case of Some, providing a default value in case of None, and they may be of different types",
    () => {
      const isEven = (x: number) => x % 2 === 0;

      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const fn = (x: number) => pipe(x, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      const resultFromEvenNumber = fn(2);
      const resultFromOddNumber = fn(3);

      expect(resultFromEvenNumber).toEqual(2);
      expect(resultFromOddNumber).toEqual("not even");
    }
  );

  it.todo(
    "You can extract a value and transform it on the fly in case of Some, providing a default value in case of None",
    () => {
      const isEven = (x: number) => x % 2 === 0;

      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const fn = (x: number) => pipe(x, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      const resultFromEvenNumber = fn(2);
      const resultFromOddNumber = fn(3);

      expect(resultFromEvenNumber).toEqual(`even value: 2`);
      expect(resultFromOddNumber).toEqual(`not an even value`);
    }
  );

  it.todo("You can map values", () => {
    const isEven = (x: number) => x % 2 === 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: number) => pipe(x, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const resultFromEvenNumber = fn(2);
    const resultFromOddNumber = fn(3);

    expect(resultFromEvenNumber).toEqual(`even value: _2_`);
    expect(resultFromOddNumber).toEqual(`not an even value`);
  });

  it.todo("You can filter values", () => {
    const isEven = (x: number) => x % 2 === 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: number) => pipe(O.some(x), TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const resultFromPositiveNumber = fn(1);
    const resultFromNegativeNumber = fn(-1);

    expect(resultFromPositiveNumber).toEqual(1);
    expect(resultFromNegativeNumber).toEqual(0);
  });

  it.todo("You can filter and map", () => {
    const isZeroOrLess = (x: number) => x <= 0;

    const doDividePieOfSize = (total: number) => (x: number) =>
      isZeroOrLess(x) ? O.none : O.some(total / x);

    const divideBy = doDividePieOfSize(4);

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: number) => pipe(x, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const halfPie = fn(2);
    const quarterPie = fn(4);
    const impossibleSlice = fn(-1);

    expect(halfPie).toEqual(2);
    expect(quarterPie).toEqual(1);
    expect(impossibleSlice).toEqual(0);
  });
});
