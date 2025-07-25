import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  vi,
} from "vitest";
import request from "supertest";
import nock from "nock";

import app from "../app.js";
import { prisma } from "../configs/prisma.config.js";
import { afterEach } from "node:test";

vi.mock("../configs/prisma.config.js", () => ({
  prisma: {
    user: {
      findMany: vi.fn(), // mock
    },
  },
}));

const mockeUserFindMany = prisma.user.findMany as unknown as ReturnType<
  typeof vi.fn
>;

describe.skip("GET /api/users from database", () => {
  const sampleUsers = [
    {
      name: "John Doe",
      email: "john.doe@mail.com",
      password: "hashedPassowr",
      profilePic: "http://dummy.com",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@mail.com",
      password: "hashedPassowr",
      profilePic: "http://dummy.com",
    },
  ];

  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
    await prisma.user.createMany({
      data: sampleUsers,
    });
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => await prisma.$disconnect());

  it("should return an array of users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty("name", "John Doe");
  });
});

describe("GET /api/users from mock", () => {
  const sampleUsers = [
    {
      name: "John Doe",
      email: "john.doe@mail.com",
      password: "hashedPassowr",
      profilePic: "http://dummy.com",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@mail.com",
      password: "hashedPassowr",
      profilePic: "http://dummy.com",
    },
  ];

  beforeEach(() => {
    mockeUserFindMany.mockReset();
    mockeUserFindMany.mockResolvedValue(sampleUsers);
  });

  it("should return an array of users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty("name", "John Doe");
  });
});

describe("GET Pokemon API", () => {
  // 1. Direct real API test
  it("should return pokemons data from real API", async () => {
    const response = await request(app).get("/api/pokemons");

    expect(response.status).toBe(200);
    expect(response.body.results).toBeInstanceOf(Array);
  });

  // 2. Mocked API with nock
  it("should return mocked pokemons data using nock", async () => {
    const mockData = {
      results: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
        {
          name: "ivysaur",
          url: "https://pokeapi.co/api/v2/pokemon/2/",
        },
      ],
    };

    nock("https://pokeapi.co").get("/api/v2/pokemon").reply(200, mockData);

    const response = await request(app).get("/api/pokemons");

    expect(response.status).toBe(200);
    expect(response.body.results).toBeInstanceOf(Array);
  });
});
