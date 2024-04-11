import * as A from "fp-ts/Array";
import * as E from "fp-ts/Either";
import * as NEA from "fp-ts/NonEmptyArray";
import { pipe } from "fp-ts/function";
import * as N from "fp-ts/number";
import { describe, expect, it } from "vitest";
import { TO_REPLACE } from "./utils";

/**
 * https://gcanti.github.io/fp-ts/modules/Array.ts.html
 * https://gcanti.github.io/fp-ts/modules/NonEmptyArray.ts.html
 */
describe("Array Advanced", () => {
  it.skip("should filter and map an array at the same time", () => {
    const input = ["{invalid json}", '{"hello": "filterMap"}'];

    const result = input.flatMap((rawData) => {
      try {
        const data = JSON.parse(rawData);
        return [data];
      } catch (error) {
        return [];
      }
    });

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual(result);
  });

  it.skip.each`
    input                         | case
    ${["green", "yellow", "red"]} | ${"when value is found"}
    ${["green", "red"]}           | ${"when value is not found"}
  `("should find an item and process it $case", ({ input }) => {
    const isYellow = (s: string) => s === "yellow";
    const toStone = (s: string) => `${s} stone`;

    const yellow = input.find(isYellow);
    const result = yellow ? toStone(yellow) : undefined;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual(result);
  });

  it.skip("should separate items in 2 groups", () => {
    type InvalidResult = { success: false; message: string };
    type ValidResult = { success: true; data: number };
    type Result = ValidResult | InvalidResult;
    type All = Result[];
    const input: All = [
      { success: false, message: "foo is not a number" },
      { success: true, data: 11 },
      { success: false, message: "another error message" },
      { success: true, data: 31 },
    ];
    const isValidResult = (d: Result): d is ValidResult => d.success;

    const result = input.reduce(
      (acc, item) => {
        if (isValidResult(item)) {
          return { items: [...acc.items, item], errors: acc.errors };
        }
        return { items: acc.items, errors: [...acc.errors, item] };
      },
      { items: [] as ValidResult[], errors: [] as InvalidResult[] }
    );

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual(result);
  });

  it.skip("should separate from an Either's list", () => {
    type InvalidResult = { message: string };
    type ValidResult = { data: number };
    type Result = E.Either<InvalidResult, ValidResult>;
    type All = Result[];
    const input: All = [
      E.left({ message: "foo is not a number" }),
      E.right({ data: 11 }),
      E.left({ message: "another error message" }),
      E.right({ data: 31 }),
    ];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual({
      left: [
        { message: "foo is not a number" },
        { message: "another error message" },
      ],
      right: [{ data: 11 }, { data: 31 }],
    });
  });

  it.skip("should find item in a list", () => {
    const input = [
      { position: 3, message: "foo" },
      { position: 11, message: "bar" },
      { position: 31, message: "gg" },
      { position: 23, message: "another" },
    ];
    const isFooItem = (item: { message: string }) => item.message === "foo";

    const foo = input.find(isFooItem);
    let result = 0;
    if (foo) {
      const position = foo.position;
      result = position + 1;
    }

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual(result);
  });

  it.skip.each`
    input     | case
    ${[]}     | ${"when array is empty"}
    ${[3, 9]} | ${"when array is not empty"}
  `(
    "should better type non empty array $case",
    ({ input }: { input: number[] }) => {
      const unsafeFunctionWithArray = (values: NEA.NonEmptyArray<number>) =>
        pipe(
          values,
          A.map((value) => value / values.length)
        );

      let result = [] as number[];
      if (A.isNonEmpty(input)) {
        result = unsafeFunctionWithArray(input);
      }

      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const resultWithPipe = pipe(input, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      expect(resultWithPipe).toEqual(result);
    }
  );

  it.skip("should dedupe simple items in a list", () => {
    const input = [1, 3, 6, 8, 3];

    const result = Array.from(new Set(input));

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, A.uniq(N.Eq));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual(result);
  });

  it.skip("should dedupe objects in a list", () => {
    const input = [
      { position: 4 },
      { position: 1 },
      { position: 12 },
      { position: 8 },
    ];

    const result = input.filter(
      (value, index) =>
        index === input.findIndex((item) => item.position === value.position)
    );

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇
    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual(result);
  });

  it.skip("should sort simple items in a list", () => {
    const input = [1, 3, 6, 8, 3];

    const result = input.sort();

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇
    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual(result);
  });

  it.skip("should sort objects in a list", () => {
    const input = [
      { position: 4 },
      { position: 1 },
      { position: 12 },
      { position: 8 },
    ];

    const result = input.sort((a, b) => a.position - b.position);

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇
    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual(result);
  });
});
