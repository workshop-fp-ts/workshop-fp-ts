import { MockAgent, MockClient, setGlobalDispatcher } from "undici";

export const TO_REPLACE = (_: any): any => {
  throw new Error("Remove 'TO_REPLACE' and make the test green");
};

const mockAgent = new MockAgent();
mockAgent.disableNetConnect();
let mockClient;

export const mockBooksApi = () => {
  mockClient = new MockClient("https://my-books-library.com", {
    agent: mockAgent,
  });
  mockClient
    .intercept({
      path: "/authors.json",
      method: "GET",
    })
    .reply(200, [
      { id: 1, name: "Victor Hugo" },
      { id: 2, name: "Robin Hobb" },
    ])
    .persist();
  mockClient
    .intercept({
      path: "/authors/1.json",
      method: "GET",
    })
    .reply(200, () => ["Les Misérables", "Le Dernier Jour d'un condamné"])
    .persist();
  mockClient
    .intercept({
      path: "/authors/2.json",
      method: "GET",
    })
    .reply(200, ["L'Assassin royal", "Le Soldat chamane"])
    .persist();
  mockClient
    .intercept({
      path: "/authors/3.json",
      method: "GET",
    })
    .reply(404, "NOT FOUND")
    .persist();
  mockClient
    .intercept({
      path: "/authors/invalidId.json",
      method: "GET",
    })
    .reply(400, "BAD QUERY")
    .persist();
  mockClient
    .intercept({
      path: "/authors/favorite.json",
      method: "GET",
    })
    .reply(200, { id: 2, name: "Robin Hobb" })
    .persist();

  setGlobalDispatcher(mockClient);
};

export const releaseBooksApiMock = () => {
  mockClient.close();
};
