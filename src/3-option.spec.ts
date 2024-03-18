import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import { expect, describe, it } from "vitest";
import { TO_REPLACE } from "./utils";

/**
 * https://gcanti.github.io/fp-ts/modules/Option.ts.html
 *
 * Option (or Maybe) represents a possibler absence of data
 *
 * type Option<T> = Some<T> | None;
 *
 * where
 * ```
 * None = { _tag: "None"};
 * ```
 * which expresses that there is no data
 *
 * and
 * ```
 * Some<T> = { _tag: "Some", value: T};
 *
 * which carries the data and the information that there is some data
 *
 */

describe("Option", () => {
  it("You can create options of the none type", () => {
    const result = O.none;

    expect(result._tag).toEqual("None");
  });

  it.skip("You can create options of the some type", () => {
    const input = 42;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const result = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(result._tag).toEqual("Some");
    if (result._tag === "Some") {
      expect(result.value).toEqual(42);
    }
  });

  it.skip("You can build an option from a possibly nullish value", () => {
    const input = 42;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: any) => pipe(x, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const resultFromTruthy = fn(input);
    const resultFromNull = fn(null);
    const resultFromUndefined = fn(undefined);

    expect(resultFromTruthy._tag).toEqual("Some");
    expect(resultFromNull._tag).toEqual("None");
    expect(resultFromUndefined._tag).toEqual("None");
  });

  it.skip("You can conditionally build a Some or None according to a predicate", () => {
    const evenNumber = 2;
    const oddNumber = 3;
    const isEven = (x: number) => x % 2 === 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: number) => pipe(x, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const resultFromEvenNumber = fn(evenNumber);
    const resultFromOddNumber = fn(oddNumber);

    expect(resultFromEvenNumber._tag).toEqual("Some");
    expect(resultFromOddNumber._tag).toEqual("None");
  });

  it.skip("You can extract a value in case of Some, providing a default value in case of None", () => {
    const evenNumber = 2;
    const oddNumber = 3;
    const isEven = (x: number) => x % 2 === 0;
    const ifNone = () => 999;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: number) => pipe(x, O.fromPredicate(isEven), TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const resultFromEvenNumber = fn(2);
    const resultFromOddNumber = fn(3);

    expect(resultFromEvenNumber).toEqual(2);
    expect(resultFromOddNumber).toEqual(999);
  });
  it.skip("You can extract a value in case of Some, providing a default value in case of None, and they may be of different types", () => {
    const evenNumber = 2;
    const oddNumber = 3;
    const isEven = (x: number) => x % 2 === 0;
    const ifNone = () => "not even";

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: number) => pipe(x, O.fromPredicate(isEven), TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const resultFromEvenNumber = fn(2);
    const resultFromOddNumber = fn(3);

    expect(resultFromEvenNumber).toEqual(2);
    expect(resultFromOddNumber).toEqual("not even");
  });

  it.skip("You can extract a value and transform it on the fly in case of Some, providing a default value in case of None", () => {
    const evenNumber = 2;
    const oddNumber = 3;
    const isEven = (x: number) => x % 2 === 0;
    const onNone = () => `not an even value`;
    const onSome = (i: number) => `even value: ${i}`;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: number) => pipe(x, O.fromPredicate(isEven), TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const resultFromEvenNumber = fn(2);
    const resultFromOddNumber = fn(3);

    expect(resultFromEvenNumber).toEqual(`even value: 4`);
    expect(resultFromOddNumber).toEqual(`not an even value`);
  });
  it.skip("You can map values", () => {
    const evenNumber = 2;
    const oddNumber = 3;
    const isEven = (x: number) => x % 2 === 0;
    const onNone = () => `not an even value`;
    const onSome = (i: number) => `even value: ${i}`;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: number) =>
      pipe(x, O.fromPredicate(isEven), TO_REPLACE, O.match(onNone, onSome));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const resultFromEvenNumber = fn(2);
    const resultFromOddNumber = fn(3);

    expect(resultFromEvenNumber).toEqual(`even value: _4_`);
    expect(resultFromOddNumber).toEqual(`not an even value`);
  });
  it.skip("You can filter values", () => {
    const isPositive = (x: number) => x >= 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: number) =>
      pipe(
        O.some(1),
        TO_REPLACE,
        O.getOrElse(() => 0)
      );

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const resultFromPositiveNumber = fn(1);
    const resultFromNegativeNumber = fn(-1);

    expect(resultFromPositiveNumber).toEqual(1);
    expect(resultFromNegativeNumber).toEqual(`not an even value`);
  });
  it.skip("You can filter and map", () => {
    const isZeroOrLess = (x: number) => x <= 0;

    const doDividePieOfSize = (total: number) => (x: number) =>
      isZeroOrLess(x) ? O.none : O.some(total / x);

    const divideBy = doDividePieOfSize(4);

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: number) =>
      pipe(
        O.some(x),
        TO_REPLACE,
        O.getOrElse(() => 0)
      );

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const halfPie = fn(2);
    const quarterPie = fn(4);
    const impossibleSlice = fn(-1);

    expect(halfPie).toEqual(2);
    expect(quarterPie).toEqual(1);
    expect(impossibleSlice).toEqual(0);
  });
});
