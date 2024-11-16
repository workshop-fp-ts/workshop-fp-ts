import * as A from "fp-ts/Array";
import * as NEA from "fp-ts/NonEmptyArray";
import { pipe } from "fp-ts/function";
import { describe, expect, it } from "vitest";
import { TO_REPLACE } from "./utils";

/**
 * Now that we've seen some basic functions, we can go deeper into array functions and how
 * they interact with other fp-ts modules.
 * You will need to search for helpful methods on these pages:
 * https://gcanti.github.io/fp-ts/modules/Array.ts.html
 * https://gcanti.github.io/fp-ts/modules/NonEmptyArray.ts.html
 */
describe("Array Advanced", () => {
  /**
   * You can use the Json module for this test:
   * https://gcanti.github.io/fp-ts/modules/Json.ts.html
   */
  it.todo("should filter and map an array at the same time", () => {
    const input = ["{invalid json}", '{"hello": "filterMap"}'];

    // We want to do the same as:
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

  it.todo.each`
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

  it.todo(
    "should separate a list of items in 2 groups according to a predicate",
    () => {
      type InvalidResult = { success: false; message: string };
      type ValidResult = { success: true; data: number };
      type Result = ValidResult | InvalidResult;
      const input: Result[] = [
        { success: false, message: "foo is not a number" },
        { success: true, data: 11 },
        { success: false, message: "another error message" },
        { success: true, data: 31 },
      ];
      const isValidResult = (d: Result): d is ValidResult => d.success;

      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const resultWithPipe = pipe(input, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      expect(resultWithPipe).toEqual({
        items: [
          { success: true, data: 11 },
          { success: true, data: 31 },
        ],
        errors: [
          { success: false, message: "foo is not a number" },
          { success: false, message: "another error message" },
        ],
      });
    },
  );

  it.todo("should find item in a list", () => {
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

  it.todo.each`
    input     | case
    ${[]}     | ${"when array is empty"}
    ${[3, 9]} | ${"when array is not empty"}
  `(
    "should better type non empty array $case",
    ({ input }: { input: number[] }) => {
      const unsafeFunctionWithArray = (values: NEA.NonEmptyArray<number>) =>
        pipe(
          values,
          A.map((value) => value / values.length),
        );

      let result = [] as number[];
      if (A.isNonEmpty(input)) {
        result = unsafeFunctionWithArray(input);
      }

      // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

      const resultWithPipe = pipe(input, TO_REPLACE);

      // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

      expect(resultWithPipe).toEqual(result);
    },
  );

  it.todo("should dedupe items in a list", () => {
    const input = [
      { position: 4 },
      { position: 1 },
      { position: 1 },
      { position: 12 },
      { position: 12 },
      { position: 8 },
      { position: 12 },
    ];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual([
      { position: 4 },
      { position: 1 },
      { position: 12 },
      { position: 8 },
    ]);
  });

  it.todo("should sort simple items in a list", () => {
    const input = [1, 3, 6, 8, 3];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual([1, 3, 3, 6, 8]);
  });

  it.todo("should sort objects in a list", () => {
    const input = [
      { position: 4 },
      { position: 1 },
      { position: 12 },
      { position: 8 },
    ];

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual([
      { position: 1 },
      { position: 4 },
      { position: 8 },
      { position: 12 },
    ]);
  });
});
