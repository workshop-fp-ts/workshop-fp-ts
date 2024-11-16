import * as A from "fp-ts/Array";
import * as T from "fp-ts/Task";
import { pipe } from "fp-ts/function";
import { describe, expect, it } from "vitest";
import { TO_REPLACE } from "./utils";

/**
 * https://gcanti.github.io/fp-ts/guides/do-notation.html
 *
 * Do notation can be used to simplify your code
 */
describe("Do notation", () => {
  it.todo("The do notation help you create a context", async () => {
    const authorId = 42;

    const taskToSimplify = pipe(
      getAuthor(authorId),
      T.flatMap((author) =>
        pipe(
          getBooksByAuthor(author.id),
          T.map((books) => ({ author, books })),
        ),
      ),
      T.flatMap(({ author, books }) =>
        pipe(
          getSimilarAuthors(author.id),
          T.map((similarAuthors) => ({ author, books, similarAuthors })),
        ),
      ),
      T.map(toAuthorDto),
    );

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇
    const taskWithDoNotation = pipe(
      getAuthor(authorId),
      TO_REPLACE,
      T.map(toAuthorDto),
    );
    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    const result = await taskToSimplify();
    const resultWithDoNotation = await taskWithDoNotation();
    expect(result).toEqual({
      id: 42,
      name: "John Doe",
      booksCount: 3,
      recommendedAuthors: ["Jane Doe"],
    });
    expect(result).toEqual(resultWithDoNotation);
  });
});

type Author = { id: number; name: string };
type SimilarAuthor = Author & { similarTo: number };
type Book = { id: number; title: string; authorId: number };
type AuthorDto = {
  id: number;
  name: string;
  booksCount: number;
  recommendedAuthors: string[];
};

const getBooksByAuthor =
  (id: number): T.Task<Book[]> =>
  () =>
    Promise.resolve([
      { id: 1, title: "My first book", authorId: id },
      { id: 2, title: "This is the end", authorId: id },
      { id: 3, title: "I need more money", authorId: id },
    ]);

const getAuthor =
  (id: number): T.Task<Author> =>
  () =>
    Promise.resolve({ id, name: `John Doe` });

const getSimilarAuthors =
  (id: number): T.Task<SimilarAuthor[]> =>
  () =>
    Promise.resolve([{ id: 37, name: "Jane Doe", similarTo: id }]);

const toAuthorDto = ({
  author,
  books,
  similarAuthors,
}: {
  author: Author;
  books: Book[];
  similarAuthors: SimilarAuthor[];
}): AuthorDto => ({
  id: author.id,
  name: author.name,
  booksCount: books.length,
  recommendedAuthors: pipe(
    similarAuthors,
    A.map((author) => author.name),
  ),
});
