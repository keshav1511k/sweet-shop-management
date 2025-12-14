const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Keshav",
        email: `keshav${Date.now()}@test.com`,
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  it("should login an existing user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "keshav@test.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

});
