import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import { expect, describe, it } from "vitest";
import { TO_REPLACE } from "./utils";

/**
 * https://gcanti.github.io/fp-ts/modules/Either.ts.html
 *
 * Either is used to represent a value that can have two distinct types. An Either value is a Left or a Right:
 *
 * ```
 * type Either<E, A> = Left<E> | Right<A>
 * ```
 *
 * Usually, it's used to represent a potential failure: by convention a Right is a success and a Left is a failure.
 * The main difference with Option is that the failure part contains information where a None has no value.
 *
 * In this example, we can see how we can write a safe division function that handles the division by zero:
 *
 * ```
 * function divide(a, b): Either<string, number> {
 *   if(b === 0) {
 *     return E.left("Division by zero is not allowed");
 *   }
 *   return E.right(a / b);
 * }
 * ```
 */

describe("Either", () => {
  it.skip("With E.map, you can transform the Right value of an Either", () => {
    const input = E.right(1);
    const double = (i: number) => i * 2;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const result = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(result).toEqual(E.right(2));
  });

  it.skip("With E.mapLeft, you can transform the Left value of an Either", () => {
    const input = E.left(1);
    const double = (i: number) => i * 2;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const result = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(result).toEqual(E.left(2));
  });

  it.skip("You can create a Either from a nullable value", () => {
    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const toEither = (n: number | null) => pipe(n, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(toEither(2)).toEqual(E.right(2));
    expect(toEither(null)).toEqual(E.left("No value provided"));
  });

  it.skip("You can create a Either from an Option", () => {
    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const toEither = (n: O.Option<number>) => pipe(n, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(toEither(O.some(2))).toEqual(E.right(2));
    expect(toEither(O.none)).toEqual(E.left("No value provided"));
  });

  it.skip("With E.fromPredicate, you can conditionnaly create a Left or a Right", () => {
    const isEven = (i: number) => i % 2 === 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const onlyEvenNumbers = (n: number) => pipe(n, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(onlyEvenNumbers(2)).toEqual(E.right(2));
    expect(onlyEvenNumbers(8)).toEqual(E.right(8));
    expect(onlyEvenNumbers(1)).toEqual(E.left("1 is not even"));
    expect(onlyEvenNumbers(5)).toEqual(E.left("5 is not even"));
  });

  it.skip("With E.fromPredicate, you can conditionnaly create a Left or a Right", () => {
    const isEven = (i: number) => i % 2 === 0;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const onlyEvenNumbers = (n: number) => pipe(n, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(onlyEvenNumbers(2)).toEqual(E.right(2));
    expect(onlyEvenNumbers(8)).toEqual(E.right(8));
    expect(onlyEvenNumbers(1)).toEqual(E.left("1 is not even"));
    expect(onlyEvenNumbers(5)).toEqual(E.left("5 is not even"));
  });

  it.skip("You can extract a value, providing a default value in case of left", () => {
    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const getValue = (n: E.Either<string, number>) => pipe(n, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(getValue(E.right(2))).toEqual(2);
    expect(getValue(E.right(17))).toEqual(17);
    expect(getValue(E.left("error"))).toEqual(-1);
    expect(getValue(E.left("another error"))).toEqual(-1);
  });

  it.skip("You can extract a value, providing a default value in case of left", () => {
    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const getValue = (n: E.Either<string, number>) => pipe(n, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(getValue(E.right(2))).toEqual(2);
    expect(getValue(E.right(17))).toEqual(17);
    expect(getValue(E.left("error"))).toEqual(-1);
    expect(getValue(E.left("another error"))).toEqual(-1);
  });

  it.skip("You can flatten Eithers", () => {
    const keepOnlyEven = E.fromPredicate(
      (n: number) => n % 2 === 0,
      () => "Not a multiple of 2"
    );
    const keepOnlyMultiplesOf3 = E.fromPredicate(
      (n: number) => n % 3 === 0,
      () => "Not a multiple of 3"
    );

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const keepOnlyMultiplesOf6 = (n: number) =>
      pipe(n, keepOnlyEven, E.map(keepOnlyMultiplesOf3));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(keepOnlyMultiplesOf6(6)).toEqual(E.right(6));
    expect(keepOnlyMultiplesOf6(24)).toEqual(E.right(24));
    expect(keepOnlyMultiplesOf6(2)).toEqual(E.left("Not a multiple of 6"));
    expect(keepOnlyMultiplesOf6(8)).toEqual(E.left("Not a multiple of 6"));
  });
});

/**
 * combinators

    tap

    ✓ left 
    ✓ of
    ✓ right

    ✓ fromNullable
    ✓ fromOption

error handling

    alt
    ✓ getOrElse
    ✓ map
    ✓ mapLeft
    orElse
    
filtering

    filterOrElse
    filterOrElseW

folding

    reduce


interop

    tryCatch
    tryCatchK

lifting

    ✓ fromPredicate

mapping

    as
    asUnit
    bimap
    flap
    ✓ map

model

    ✓ Either (type alias)
    ✓ Left (interface)
    ✓ Right (interface)

pattern matching

    match
    matchW

refinements

    isLeft
    isRight

sequencing

    ✓ flatMap
    ✓ flatten


utils

    toError


 */
