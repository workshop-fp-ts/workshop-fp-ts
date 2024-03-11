import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import { expect, describe, it } from "vitest";
import { TO_REPLACE } from "./utils";

// O.some
// O.fromNullable
// O.fromPredicate

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

    const resultFromTruthy = pipe(input, TO_REPLACE);
    const resultFromNull = pipe(null, TO_REPLACE);
    const resultFromUndefined = pipe(undefined, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultFromTruthy._tag).toEqual("Some");
    expect(resultFromNull._tag).toEqual("None");
    expect(resultFromUndefined._tag).toEqual("None");
  });

  it.skip("You can conditionally build a Some or None according to a predicate", () => {
    const evenNumber = 2;
    const oddNumber = 3;
    const isEven = (x: number) => x % 2 === 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultFromEvenNumber = pipe(evenNumber, TO_REPLACE);
    const resultFromOddNumber = pipe(oddNumber, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultFromEvenNumber._tag).toEqual("Some");
    expect(resultFromOddNumber._tag).toEqual("None");
  });

  it.skip("You can extract a value in case of Some, providing a default value in case of None", () => {
    const evenNumber = 2;
    const oddNumber = 3;
    const isEven = (x: number) => x % 2 === 0;
    const ifNone = () => 999;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultFromEvenNumber = pipe(2, TO_REPLACE, TO_REPLACE);
    const resultFromOddNumber = pipe(3, TO_REPLACE, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultFromEvenNumber).toEqual(2);
    expect(resultFromOddNumber).toEqual(999);
  });

  it.skip("You can extract a value and transform it on the fly in case of Some, providing a default value in case of None", () => {
    const evenNumber = 2;
    const oddNumber = 3;
    const isEven = (x: number) => x % 2 === 0;
    const onNone = () => `not an even value`;
    const onSome = (i: number) => `even value: ${i}`;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultFromEvenNumber = pipe(2, TO_REPLACE, TO_REPLACE);
    const resultFromOddNumber = pipe(3, TO_REPLACE, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultFromEvenNumber).toEqual(`even value: 4`);
    expect(resultFromOddNumber).toEqual(`not an even value`);
  });
});
