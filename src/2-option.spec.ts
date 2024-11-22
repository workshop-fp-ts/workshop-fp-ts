// Comme précemment on importe ci-dessous la boîte outil "Option" de fp-ts
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import { describe, expect, it } from "vitest";

/**
 * https://gcanti.github.io/fp-ts/modules/Option.ts.html
 *
 * An option represents a possible absence of data, it's a safer alternative
 * to replace null and undefined values.
 *
 * type Option<T> = Some<T> | None;
 *
 * where
 * ```
 * None = { _tag: "None"}; // which expresses that there is no data
 * ```
 *
 * and
 * ```
 * Some<T> = { _tag: "Some", value: T}; // which expresses that there is some data
 * ```
 *
 * Moreover, there are many helpful functions in the fp-ts Option module:
 * https://gcanti.github.io/fp-ts/modules/Option.ts.html
 */

describe("Option", () => {
  it("You can create an empty option value", () => {
    const result: any = O.none;

    expect(O.isNone(result)).toEqual(true);
  });

  it("You can create an option containing a value", () => {
    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const result: any = O.some(42);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    if (O.isNone(result)) {
      throw new Error("should be a Some");
    }
    expect(result.value).toEqual(42);
  });

  it("You can transform a nullable value into an option, which is safer", () => {
    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: any) => pipe(x, O.fromNullable);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const resultFromValue = fn(42);
    expect(O.isSome(resultFromValue)).toEqual(true);

    const resultFromNull = fn(null);
    expect(O.isNone(resultFromNull)).toEqual(true);

    const resultFromUndefined = fn(undefined);
    expect(O.isNone(resultFromUndefined)).toEqual(true);
  });

  it("You can build an option according to a predicate function: it contains the value only if the predicate return true, otherwise it will be a None", () => {
    // The predicate function
    const isEven = (x: number) => x % 2 === 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: number) => pipe(x, O.fromPredicate(isEven));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const resultFromEvenNumber = fn(2);
    expect(O.isSome(resultFromEvenNumber)).toEqual(true);

    const resultFromOddNumber = fn(3);
    expect(O.isNone(resultFromOddNumber)).toEqual(true);
  });

  it("You can transform the value inside the option", () => {
    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const greet = (name: O.Option<string>) =>
      pipe(
        name,
        O.map((v) => `Hello ${v}!`)
      );

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const greetings1 = greet(O.some("Batman"));
    expect(greetings1).toEqual(O.some("Hello Batman!"));

    const greetings2 = greet(O.some("Clovis"));
    expect(greetings2).toEqual(O.some("Hello Clovis!"));

    const greetings3 = greet(O.none);
    expect(greetings3).toEqual(O.none);
  });

  it("You can extract the value from the option, providing a default value in case of None", () => {
    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (name: O.Option<string>) =>
      pipe(
        name,
        O.getOrElse(() => "Unknown")
      );

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const result1 = fn(O.some("Batman"));
    expect(result1).toEqual("Batman");

    const result2 = fn(O.none);
    expect(result2).toEqual("Unknown");
  });

  it("You can filter values, which means you can transform a Some into a None depending on a predicate", () => {
    const isPositive = (x: number) => x > 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const keepPositiveNumber = (x: O.Option<number>) =>
      pipe(x, O.filter(isPositive));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const resultFromPositiveNumber = keepPositiveNumber(O.some(1));
    expect(resultFromPositiveNumber).toEqual(O.some(1));

    const resultFromNegativeNumber = keepPositiveNumber(O.some(-1));
    expect(resultFromNegativeNumber).toEqual(O.none);
  });
});
