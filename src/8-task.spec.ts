import * as T from "fp-ts/Task";
import { pipe } from "fp-ts/function";
import { fetch } from "undici";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { TO_REPLACE, mockBooksApi, releaseBooksApiMock } from "./utils";

/**
 * https://gcanti.github.io/fp-ts/modules/Task.ts.html
 *
 * Task is used to represent an asynchronous operation.
 * It is quite similar to Promises in JavaScript except for those two differences:
 *
 *  - A task is lazy, meaning it won't be executed right away
 *  - A task (by convention) never fails
 *
 * In fact a task is simply a function returning a promise.
 *
 * ```
 * type Task<A> = () => Promise<A>
 * ```
 *
 * Nothing really guarantees that your task won't fail, it's a convention you must follow.
 * If your operation can fail, you need to use a TaskEither, as we'll see later!
 *
 * ```
 * function waitFor(milliseconds): Task<void> {
 *   return () => {
 *      return new Promise(resolve => setTimeout(resolve, milliseconds));
 *   };
 * }
 *
 * const myTask = waitFor(1000);
 * myTask().then(() => console.log('Hello the future!'));
 * ```
 */

describe("Task", () => {
  beforeEach(() => {
    mockBooksApi();
  });

  afterEach(() => {
    releaseBooksApiMock();
  });

  it.skip("Create task from constant value", () => {
    const input = 42;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const task = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    return expect(task()).resolves.toEqual(42);
  });

  it.skip("You can map task values", () => {
    const input = T.of("hello");
    const toUppercase = (value: string) => value.toUpperCase();

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const task = pipe(input, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    return expect(task()).resolves.toEqual("HELLO");
  });

  it.skip("More concrete example: wrapping fetch within a Task", () => {
    const getAuthorsTask = () =>
      fetch("https://my-book-library.com/authors.json");

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const task = pipe(getAuthorsTask, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    return expect(task()).resolves.toEqual(["Victor Hugo", "Robin Hobb"]);
  });

  it.skip("Combining several tasks", () => {
    const getAuthorsTask = () =>
      fetch("https://my-book-library.com/authors.json");

    const getAuthorBooks = (authorId: number) => {
      fetch(`https://my-book-library.com/authors/${authorId}.json`);
    };

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const authorsWithBooks = pipe(getAuthorsTask, TO_REPLACE);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    return expect(authorsWithBooks()).resolves.toEqual([
      {
        name: "Victor Hugo",
        books: ["Les Misérables", "Le Dernier Jour d'un condamné"],
      },
      { name: "Robin Hobb", books: ["L'Assassin royal", "Le Soldat chamane"] },
    ]);
  });
});
