import { pipe } from "fp-ts/function";
import { describe, expect, it } from "vitest";
import { TO_REPLACE } from "./utils";

/**
 * https://gcanti.github.io/fp-ts/modules/Array.ts.html
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
});

/**
 * Advanced
 *
 * filterMap
 * partition
 * separate
 *
 * findFirst
 * isOutOfBound / lookup
 * insertAt
 * updateAt
 * deleteAt
 *
 * elem
 * sort
 * sortBy
 * uniq
 */
