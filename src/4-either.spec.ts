import * as A from "fp-ts/Array";
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
  it.todo("With E.map, you can transform the Right value of an Either", () => {
    const input = E.right(1);
    const double = (i: number) => i * 2;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const result = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(result).toEqual(E.right(2));
  });

  it.todo(
    "With E.mapLeft, you can transform the Left value of an Either",
    () => {
      const input = E.left(1);
      const double = (i: number) => i * 2;

      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const result = pipe(input, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      expect(result).toEqual(E.left(2));
    }
  );

  it.todo("You can create a Either from a nullable value", () => {
    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const toEither = (n: number | null) => pipe(n, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(toEither(2)).toEqual(E.right(2));
    expect(toEither(null)).toEqual(E.left("No value provided"));
  });

  it.todo("You can create a Either from an Option", () => {
    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const toEither = (n: O.Option<number>) => pipe(n, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(toEither(O.some(2))).toEqual(E.right(2));
    expect(toEither(O.none)).toEqual(E.left("No value provided"));
  });

  it.todo(
    "With E.fromPredicate, you can conditionnaly create a Left or a Right",
    () => {
      const isEven = (i: number) => i % 2 === 0;

      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const onlyEvenNumbers = (n: number) => pipe(n, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      expect(onlyEvenNumbers(2)).toEqual(E.right(2));
      expect(onlyEvenNumbers(8)).toEqual(E.right(8));
      expect(onlyEvenNumbers(1)).toEqual(E.left("1 is not even"));
      expect(onlyEvenNumbers(5)).toEqual(E.left("5 is not even"));
    }
  );

  it.todo(
    "You can extract a value, providing a default value in case of left",
    () => {
      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const getValue = (n: E.Either<string, number>) => pipe(n, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      expect(getValue(E.right(2))).toEqual(2);
      expect(getValue(E.right(17))).toEqual(17);
      expect(getValue(E.left("error"))).toEqual(-1);
      expect(getValue(E.left("another error"))).toEqual(-1);
    }
  );

  it.todo("You can flatten nested Eithers", () => {
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

describe("Either – Advanced exercises", () => {
  type UserCreationDto = { username: string; email: string; age: number };

  const hasValidEmail = (user: UserCreationDto): boolean =>
    user.email.includes("@");

  const isUnderage = (user: UserCreationDto) => user.age < 18;

  it.todo("Obtain the desired value by using all functions", () => {
    const validateUsername = (user: UserCreationDto) =>
      pipe(
        user,
        E.fromPredicate(
          (user) => user.username.length > 3,
          () => "invalid_username"
        )
      );

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const validateUser = (user: UserCreationDto) => {
      // TODO
    };

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(
      validateUser({
        username: "Richard",
        email: "richardgmail.com",
        age: 18,
      })
    ).toEqual(E.left("invalid_email"));

    expect(
      validateUser({
        username: "Jo",
        email: "jo@gmail.com",
        age: 20,
      })
    ).toEqual(E.left("invalid_username"));

    expect(
      validateUser({
        username: "Jordy",
        email: "jo@gmail.com",
        age: 12,
      })
    ).toEqual(E.left("underage"));
  });

  it.todo("Array's PARTITIONMAP", () => {}); // TODO

  it.todo("Advanced exercise: this one is more difficult!", () => {
    const validateEmail = E.fromPredicate(
      (user: UserCreationDto) => user.email.includes("@"),
      () => ["invalid_email"]
    );

    const validateOverage = E.fromPredicate(
      (user: UserCreationDto) => user.age >= 18,
      () => ["underage"]
    );

    const validateUsername = E.fromPredicate(
      (user: UserCreationDto) => user.username.length > 3,
      () => ["invalid_username"]
    );

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const validateUser = (user: UserCreationDto) => {
      // TODO
    };

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(
      validateUser({
        username: "Richard",
        email: "richardgmail.com",
        age: 18,
      })
    ).toEqual(E.left(["invalid_email"]));

    expect(
      validateUser({
        username: "Jo",
        email: "jogmail.com",
        age: 12,
      })
    ).toEqual(E.left(["invalid_email", "invalid_username", "underage"]));
  });
});
