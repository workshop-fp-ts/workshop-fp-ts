import { MockAgent, MockClient } from "undici";

export const TO_REPLACE = (_: any): any => {
  throw new Error("Remove this function call, and make the test green");
};

const mockAgent = new MockAgent();
mockAgent.disableNetConnect();
const mockClient = new MockClient("https://my-book-library.com", {
  agent: mockAgent,
});

export const mockBooksApi = () => {
  mockClient
    .intercept({
      path: "/authors.json",
      method: "GET",
    })
    .reply(200, [
      { id: 1, name: "Victor Hugo" },
      { id: 2, name: "Robin Hobb" },
    ])
    .times(1);
  mockClient
    .intercept({
      path: "/authors/1.json",
      method: "GET",
    })
    .reply(200, ["Les Misérables", "Le Dernier Jour d'un condamné"])
    .times(1);
  mockClient
    .intercept({
      path: "/authors/2.json",
      method: "GET",
    })
    .reply(200, ["L'Assassin royal", "Le Soldat chamane"])
    .times(1);
};

export const releaseBooksApiMock = () => {
  mockClient.close();
};
