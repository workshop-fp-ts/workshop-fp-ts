import { flow, identity, pipe } from "fp-ts/function";
import { expect, describe, it } from "vitest";
import { TO_REPLACE } from "./utils";

describe("Basics", () => {
  it("should process data with pipe", () => {
    const input = "20";
    const parseNumber = (raw: string) => parseInt(raw, 10);
    const increment = (i: number) => i + 1;
    const double = (i: number) => i * 2;

    const resultWithPipe = pipe(input, TO_REPLACE);

    expect(resultWithPipe).toEqual(42);
  });

  it.skip("let it flow", () => {
    const input = "20";

    const resultWithPipe = flow(TO_REPLACE)(input);

    expect(resultWithPipe).toEqual(42);
  });
});
