import * as RTE from "fp-ts/ReaderTaskEither";
import * as A from "fp-ts/Array";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { describe, expect, it } from "vitest";

/**
 * https://gcanti.github.io/fp-ts/modules/Reader.ts.html
 *
 * Reader can be used to inject dependencies through multiple functions
 */

describe("Reader", () => {
  it("The reader monad help you inject dependencies", async () => {
    type Sync = TE.TaskEither<DatabaseError | FetchError, Author[]>;
    const buildGetAuthors_PartialApplication =
      ({ authorClient }: { authorClient: AuthorClient }) =>
      (cursor: number) =>
        pipe(
          authorClient.getAll(),
          TE.map(A.filter((author) => author.id > cursor))
        );
    const buildSync_PartialApplication = ({
      authorClient,
      authorRepository,
    }: Dependencies) => {
      const getAuthors = buildGetAuthors_PartialApplication({ authorClient });
      return (cursor: number): Sync =>
        pipe(
          getAuthors(cursor),
          TE.flatMap((authors) =>
            pipe(
              authors,
              A.map(authorRepository.upsert),
              A.sequence(TE.ApplicativeSeq)
            )
          )
        );
    };

    // ⬇⬇⬇⬇ Code here ⬇⬇⬇⬇
    const fetchAuthors_Reader =
      (
        cursor: number
      ): RTE.ReaderTaskEither<
        Pick<Dependencies, "authorClient">,
        FetchError,
        Author[]
      > =>
      ({ authorClient }) =>
        pipe(
          authorClient.getAll(),
          TE.map(A.filter((author) => author.id > cursor))
        );
    const persistAuthors_Reader =
      (
        authors: Author[]
      ): RTE.ReaderTaskEither<
        Pick<Dependencies, "authorRepository">,
        DatabaseError,
        Author[]
      > =>
      ({ authorRepository }) =>
        pipe(
          authors,
          A.map(authorRepository.upsert),
          A.sequence(TE.ApplicativeSeq)
        );
    const sync_Reader = (cursor: number) =>
      pipe(fetchAuthors_Reader(cursor), RTE.flatMap(persistAuthors_Reader));
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
    const program = pipe(dependencies, program_Reader);
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
