import * as O from "fp-ts/Option";
import type { Option } from "fp-ts/Option";
import * as R from "fp-ts/Record";
import { pipe } from "fp-ts/function";
import { expect, describe, it } from "vitest";
import { TO_REPLACE } from "./utils";
import { isPromise } from "util/types";

/**
 * https://gcanti.github.io/fp-ts/modules/Record.ts.html
 *
 * Record enables dealing with Typescript’s Record<K, T> type in a functional way
 *
 */

describe("Record", () => {
  it.todo("You can build a record from entries", () => {
    const entries: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["a", 3],
    ];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const record = pipe(entries, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(record["a"]).toEqual(3);
    expect(record["b"]).toEqual(2);
  });
  it.todo("You can get an array of tuples from a record", () => {
    const record = {
      b: 2,
      a: 3,
    };

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const result = pipe(record, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(result).toEqual(
      expect.objectContaining([
        ["a", 3],
        ["b", 2],
      ])
    );
  });
  it.todo("You can map values of record's entries", () => {
    const isEven = (x: number) => x % 2 === 0;

    const record = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const result = pipe(record, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(result).toEqual(
      expect.objectContaining({
        a: false,
        b: true,
        c: false,
        d: true,
      })
    );
  });
  it.todo(
    "You can filter records, keeping only entries with a value that satisfies a predicate",
    () => {
      const isEven = (x: number) => x % 2 === 0;

      const record = {
        b: 2,
        a: 3,
      };

      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const result = pipe(record, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      expect(result).toEqual(expect.objectContaining({ b: 2 }));
    }
  );
  it.todo(
    "You can filter records of Options, keeping only the Some values",
    () => {
      const record = {
        a: O.some(3),
        b: O.none,
      };

      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const result = pipe(record, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      expect(result).toEqual(expect.objectContaining({ a: 3 }));
    }
  );
  it.todo(
    "You can filter records with values satisfying a predicate and map the retained values",
    () => {
      const mapIfEven = (x: number) =>
        x % 2 === 0 ? O.some(`${x} is even`) : O.none;

      const record = {
        a: 6,
        b: 3,
        c: 8,
      };

      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const result = pipe(record, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      expect(result).toEqual(
        expect.objectContaining({ a: "6 is even", c: "8 is even" })
      );
    }
  );
  it.todo(
    "You can take a Record of functions and a value to produce a Record with the processed input",
    () => {
      type UserCreationDto = { username: string; email: string; age: number };

      const validateEmail = (user: UserCreationDto) => user.email.includes("@");

      const validateOverage = (user: UserCreationDto) => user.age >= 18;

      const validateUsername = (user: UserCreationDto) =>
        user.username.length > 3;

      const record = {
        validUsername: validateUsername,
        validEmail: validateEmail,
        validAge: validateOverage,
      };

      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const validateUser = (user: UserCreationDto) => pipe(record, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      expect(
        validateUser({
          username: "Richard",
          email: "richardgmail.com",
          age: 18,
        })
      ).toEqual(
        expect.objectContaining({
          validUsername: true,
          validEmail: false,
          validAge: true,
        })
      );
      expect(
        validateUser({
          username: "Jo",
          email: "jo@gmail.com",
          age: 20,
        })
      ).toEqual(
        expect.objectContaining({
          validUsername: false,
          validEmail: true,
          validAge: true,
        })
      );
      expect(
        validateUser({
          username: "Jordy",
          email: "jo@gmail.com",
          age: 12,
        })
      ).toEqual(
        expect.objectContaining({
          validUsername: true,
          validEmail: true,
          validAge: false,
        })
      );
    }
  );
});
