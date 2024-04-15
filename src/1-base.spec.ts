import { pipe } from "fp-ts/function";
import { expect, describe, it } from "vitest";
import { TO_REPLACE } from "./utils";

/**
 * Pipe let you chain data processing effortlessly
 */
describe("Basics", () => {
  it("should process data with pipe", () => {
    const input = "20";
    const parseNumber = (raw: string) => parseInt(raw, 10);

    const result = parseNumber(input);

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual(result);
  });

  it.todo("you can pipe as much as you want", () => {
    const input = "20";
    const parseNumber = (raw: string) => parseInt(raw, 10);
    const increment = (i: number) => i + 1;
    const double = (i: number) => i * 2;

    const value = parseNumber(input);
    const incrementedValue = increment(value);
    const result = double(incrementedValue);

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual(result);
  });

  it.todo("you can use lambda directly in your pipe", () => {
    const input = "20";
    const parseNumber = (raw: string) => parseInt(raw, 10);
    const double = (i: number) => i * 2;

    const value = parseNumber(input);
    const incrementedValue = value + 5;
    const result = double(incrementedValue);

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const resultWithPipe = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    expect(resultWithPipe).toEqual(result);
  });
});
