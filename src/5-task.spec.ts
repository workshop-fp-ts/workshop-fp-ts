import * as TE from "fp-ts/TaskEither";
import * as A from "fp-ts/Array";
import * as E from "fp-ts/Either";
import { flow, pipe } from "fp-ts/function";
import * as T from "fp-ts/Task";
import { fetch } from "undici";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockBooksApi, releaseBooksApiMock } from "./utils";

/**
 * https://gcanti.github.io/fp-ts/modules/Task.ts.html
 *
 * Task is used to represent an asynchronous operation.
 * It is quite similar to Promises in JavaScript except for those two differences:
 *
 *  - A task (by convention) never fails
 *  - A task is lazy, meaning it won't be executed right away
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

type Author = { id: number; name: string };

describe("Task", () => {
  beforeEach(() => {
    mockBooksApi();
  });

  afterEach(() => {
    releaseBooksApiMock();
  });

  it("Create task from constant value", () => {
    const input = 42;

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const task = pipe(input, T.of);

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    return expect(task()).resolves.toEqual(42);
  });

  it("You can map task values", () => {
    const input = T.of("hello");
    const toUppercase = (value: string) => value.toUpperCase();

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const task = pipe(input, T.map(toUppercase));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    return expect(task()).resolves.toEqual("HELLO");
  });

  it("More concrete example: wrapping fetch within a Task", () => {
    const getAuthorsTask: T.Task<Author[]> = () =>
      fetch("https://my-books-library.com/authors.json").then(
        (response) => response.json() as any
      );

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const task = pipe(getAuthorsTask, T.map(A.map((author) => author.name)));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    return expect(task()).resolves.toEqual(["Victor Hugo", "Robin Hobb"]);
  });

  it("Chaining tasks", () => {
    const getFavoriteAuthorTask: T.Task<Author> = () =>
      fetch("https://my-books-library.com/authors/favorite.json").then(
        (response) => response.json() as any
      );

    const getAuthorBooks =
      (authorId: number): T.Task<string[]> =>
      () =>
        fetch(`https://my-books-library.com/authors/${authorId}.json`).then(
          (response) => response.json() as any
        );

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const favoriteAuthorWithBooks = pipe(
      getFavoriteAuthorTask,
      T.flatMap((author) => {
        return pipe(
          getAuthorBooks(author.id),
          T.map((books) => ({ name: author.name, books }))
        );
      })
    );

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    return expect(favoriteAuthorWithBooks()).resolves.toEqual({
      name: "Robin Hobb",
      books: ["L'Assassin royal", "Le Soldat chamane"],
    });
  });

  it("Combining several tasks", () => {
    const getAuthorsTask: T.Task<Author[]> = () =>
      fetch("https://my-books-library.com/authors.json").then(
        (response) => response.json() as any
      );

    const getAuthorBooks =
      (authorId: number): T.Task<string[]> =>
      () =>
        fetch(`https://my-books-library.com/authors/${authorId}.json`).then(
          (response) => response.json() as any
        );

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇

    const authorsWithBooks = pipe(
      getAuthorsTask,
      T.flatMap(
        flow(
          A.map((author) =>
            pipe(
              getAuthorBooks(author.id),
              T.map((books) => ({ name: author.name, books }))
            )
          ),
          T.sequenceArray
        )
      )
    );

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

/**
 * https://gcanti.github.io/fp-ts/modules/TaskEither.ts.html
 *
 * In the previous exercises, we've used the Task module in a wrong way: wrapping
 * fetch() calls. This is wrong because a remote call can always fail:
 * sometimes network connection is bad, sometimes the remote API is down, ...
 * A Task cannot fail, so we would need to handle it and recover from the error:
 *
 * ```
 * const getAuthorsTask: T.Task<Author[]> = () =>
 *    fetch("https://my-books-library.com/authors.json")
 *       .then((response) => response.json())
 *       .catch(() => []);
 * ```
 *
 * Sometimes we cannot recover and still need to handle or propagate the error. In these case,
 * we will use a TaskEither instead, which is a Task returning an Either
 *
 * ```
 * interface TaskEither<E, A> extends Task<Either<E, A>> {}
 * ```
 */
describe("TaskEither", () => {
  beforeEach(() => {
    mockBooksApi();
  });

  afterEach(() => {
    releaseBooksApiMock();
  });

  it("Properly wrapping fetch within a TaskEither", async () => {
    // ⬇⬇⬇⬇ Fix code here ⬇⬇⬇⬇

    const getAuthorBooks = (authorId) =>
      pipe(
        authorId,
        TE.tryCatchK(
          () => fetch(`https://my-books-library.com/authors/${authorId}.json`),
          () => "NETWORK_ERROR"
        ),
        TE.filterOrElse(
          (response) => response.status !== 404,
          () => "NOT FOUND"
        ),
        TE.filterOrElse(
          (response) => response.status !== 400,
          () => "BAD REQUEST"
        ),
        TE.flatMap(
          TE.tryCatchK(
            (response) => response.json(),
            () => "JSON_PARSING_ERROR"
          )
        )
      );

    // ⬆⬆⬆⬆ Fix code here ⬆⬆⬆⬆

    await expect(getAuthorBooks(1)()).resolves.toEqual(
      E.right(["Les Misérables", "Le Dernier Jour d'un condamné"])
    );
    await expect(getAuthorBooks(3)()).resolves.toEqual(E.left("NOT FOUND"));
    await expect(getAuthorBooks("invalidId")()).resolves.toEqual(
      E.left("BAD REQUEST")
    );
  });
});
