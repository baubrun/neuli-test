import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { url, fetchUsers } from "../api";
import { validateSchema } from "../validation";

const user1 = { data: { first_name: "George" } };
const user2 = { data: { first_name: "Janet" } };

const server = setupServer(
  rest.get(`${url}/1`, (req, res, ctx) => {
    return res(ctx.json(user1));
  }),
  rest.get(`${url}/2`, (req, res, ctx) => {
    return res(ctx.json(user2));
  })
);

describe("App", () => {
  it("should match snapshot", () => {
    const { container: containerOne } = render(<App />);
    expect(containerOne).toMatchSnapshot();
  });
});

describe("GET requests", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("GET requests should return first names ", async () => {
    const [first, second] = await fetchUsers("1", "2");
    expect([first, second]).toEqual([user1, user2]);
  });
});

describe("validateSchema", () => {
  it("should throw error if params falsy ", async () => {
    try {
      validateSchema({ var1: "", var2: undefined });
    } catch (error) {
      const e = "var2 is a required field";
      expect(error.message).toEqual(e);
    }
  });

  it("should throw error if  param < 1 or param > 10  ", async () => {
    try {
      validateSchema({ var1: "11", var2: "2" });
    } catch (error) {
      const e = "var1 must be less than or equal to 10";
      expect(error.message).toEqual(e);
    }
  });
});
