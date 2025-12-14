const request = require("supertest");
const app = require("../app");

let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "keshav@test.com",
      password: "123456"
    });
  token = res.body.token;
});

describe("Sweet API", () => {
  it("should add a new sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gulab Jamun",
        category: "Dessert",
        price: 10,
        quantity: 100
      });

    expect(res.statusCode).toBe(201);
  });

  it("should get all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
