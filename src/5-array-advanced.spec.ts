import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import { expect, describe, it } from "vitest";
import { TO_REPLACE } from "./utils";

/**
 * https://gcanti.github.io/fp-ts/modules/Array.ts.html
 */
describe("Array Advanced", () => {
  it.skip("filter and map an array", () => {
    const input = [1, 2, 3];

    // TODO

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE, (total) => ({
      total,
    }));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual({ total: 6 });
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
