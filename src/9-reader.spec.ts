import * as A from "fp-ts/Array";
import * as TE from "fp-ts/TaskEither";
import * as RTE from "fp-ts/ReaderTaskEither";
import { pipe } from "fp-ts/function";
import { describe, expect, it } from "vitest";
import { TO_REPLACE } from "./utils";

/**
 * https://gcanti.github.io/fp-ts/modules/Reader.ts.html
 * https://gcanti.github.io/fp-ts/modules/ReaderTaskEither.ts.html
 *
 * Reader can be used to inject dependencies through multiple functions
 * PS: When you are working with async data you must use ReaderTaskEither
 */

describe("Reader", () => {
  it("The reader monad help you inject dependencies", async () => {
    const buildGetAuthors_PartialApplication =
      ({ authorClient }: { authorClient: AuthorClient }) =>
      (cursor: number) =>
        pipe(
          authorClient.getAll(),
          TE.map(A.filter((author) => author.id > cursor))
        );
    const buildUpsertAuthors_PartialApplication =
      ({ authorRepository }: { authorRepository: AuthorRepository }) =>
      (authors: Author[]) =>
        pipe(
          authors,
          A.map(authorRepository.upsert),
          A.sequence(TE.ApplicativeSeq)
        );
    const buildSync_PartialApplication = ({
      authorClient,
      authorRepository,
    }: Dependencies) => {
      const getAuthors = buildGetAuthors_PartialApplication({ authorClient });
      const upsertAuthors = buildUpsertAuthors_PartialApplication({
        authorRepository,
      });

      return (cursor: number) =>
        pipe(getAuthors(cursor), TE.flatMap(upsertAuthors));
    };

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇
    const getAuthors_Reader =
      (cursor: number) =>
      ({ authorClient }: { authorClient: AuthorClient }) =>
        pipe(
          authorClient.getAll(),
          TE.map(A.filter((author) => author.id > cursor))
        );
    const upsertAuthors_Reader =
      (authors: Author[]) =>
      ({ authorRepository }: { authorRepository: AuthorRepository }) =>
        pipe(
          authors,
          A.map(authorRepository.upsert),
          A.sequence(TE.ApplicativeSeq)
        );

    /**
     * This method does not use dependencies and just pass them "automatically" with the reader data structure
     * If you look at the inferred type of sync_Reader, you can see dependencies (R), errors (E) and output (A)
     *
     * Everything is strictly checked by the compiler and your code is simpler 🎉
     */
    const sync_Reader = (cursor: number) =>
      pipe(getAuthors_Reader(cursor), RTE.flatMap(upsertAuthors_Reader));

    // ⬆⬆⬆⬆ Code here ⬆⬆⬆⬆

    // IOC
    const dependencies: Dependencies = {
      authorClient: fakeAuthorClient,
      authorRepository: fakeAuthorRepository,
    };

    const sync_PartialApplication = buildSync_PartialApplication(dependencies);
    const program_PartialApplication = sync_PartialApplication(1);
    await program_PartialApplication();
    expect(fakeAuthorRepositoryData).toEqual([{ id: 2, name: "Robin Hobb" }]);

    resetFakeAuthorRepositoryData();

    const program_Reader = sync_Reader(1);
    const program = program_Reader(dependencies);
    await program();
    expect(fakeAuthorRepositoryData).toEqual([{ id: 2, name: "Robin Hobb" }]);
  });
});

type Dependencies = {
  authorClient: AuthorClient;
  authorRepository: AuthorRepository;
};

type Author = { id: number; name: string };

type FetchError = { type: "fetch_error"; error: Error };
type AuthorClient = {
  getAll: () => TE.TaskEither<FetchError, Author[]>;
};

type DatabaseError = { type: "database_error"; error: Error };
type AuthorRepository = {
  upsert: (author: Author) => TE.TaskEither<DatabaseError, Author>;
};

const fakeAuthorClient: AuthorClient = {
  getAll: () =>
    TE.of([
      { id: 1, name: "Victor Hugo" },
      { id: 2, name: "Robin Hobb" },
    ]),
};

let fakeAuthorRepositoryData = [] as Author[];
const resetFakeAuthorRepositoryData = () => {
  fakeAuthorRepositoryData = [];
};
const fakeAuthorRepository: AuthorRepository = {
  upsert: (authorToUpsert) => {
    const foundAuthor = fakeAuthorRepositoryData.find(
      (author) => author.id === authorToUpsert.id
    );
    if (!foundAuthor) {
      fakeAuthorRepositoryData = [...fakeAuthorRepositoryData, authorToUpsert];
    } else {
      fakeAuthorRepositoryData = fakeAuthorRepositoryData.map((author) => {
        if (author.id === authorToUpsert.id) {
          return authorToUpsert;
        }
        return author;
      });
    }
    return TE.of<DatabaseError, Author>(authorToUpsert);
  },
};
