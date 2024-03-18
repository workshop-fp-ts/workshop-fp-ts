import * as O from "fp-ts/Option";
import type { Option } from "fp-ts/Option";
import * as R from "fp-ts/Record";
import { pipe } from "fp-ts/function";
import { expect, describe, it } from "vitest";
import { TO_REPLACE } from "./utils";

/**
 * https://gcanti.github.io/fp-ts/modules/Record.ts.html
 *
 * Record enables dealing with Typescript’s Record<K, T> type in a functional way
 *
 * type Record<K, T>;
 *
 */

describe("Record", () => {
  it.skip("You can build a record from entries", () => {
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
  it.skip("You can get an array of tuples from a record", () => {
    const entries: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["a", 3],
    ];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const record = pipe(entries, R.fromEntries, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(record).toEqual(
      expect.objectContaining([
        ["a", 3],
        ["b", 2],
      ])
    );
  });
  it.skip("You can map values of record's entries", () => {
    const isEven = (x: number) => x % 2 === 0;

    const entries: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
      ["d", 4],
    ];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const record = pipe(entries, R.fromEntries, TO_REPLACE, R.toEntries);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(record).toEqual(
      expect.objectContaining([
        ["a", false],
        ["b", true],
        ["c", false],
        ["d", true],
      ])
    );
  });
  it.skip("You can filter records, keeping only entries with a value that satisfies a predicate", () => {
    const isEven = (x: number) => x % 2 === 0;

    const entries: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["a", 3],
    ];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const record = pipe(entries, R.fromEntries, TO_REPLACE, R.toArray);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(record).toEqual(expect.objectContaining([["b", 2]]));
  });
  it.skip("You can filter records of Options, keeping only the Some values", () => {
    const isEven = (x: number) => x % 2 === 0;

    const entries: [string, Option<number>][] = [
      ["a", O.some(1)],
      ["b", O.none],
      ["a", O.some(3)],
    ];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const record = pipe(entries, R.fromEntries, TO_REPLACE, R.toArray);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(record).toEqual(expect.objectContaining([["a", 3]]));
  });
  it.skip("You can take a Record of functions and a value to produce a Record with the processed input", () => {
    const isEven = (x: number) => x % 2 === 0;
    const isGreaterThanZero = (x: number) => x > 0;
    const isZero = (x: number) => x === 0;

    const entries: [string, (a: number) => boolean][] = [
      ["even", isEven],
      ["positive", isGreaterThanZero],
      ["zero", isZero],
    ];

    const record = pipe(entries, R.fromEntries);

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const fn = (x: number) => TO_REPLACE;

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(fn(-1)).toEqual(
      expect.objectContaining({
        even: false,
        positive: false,
        zero: false,
      })
    );
    expect(fn(2)).toEqual(
      expect.objectContaining({
        even: true,
        positive: true,
        zero: false,
      })
    );
    expect(fn(0)).toEqual(
      expect.objectContaining({
        even: true,
        positive: false,
        zero: true,
      })
    );
  });
});
