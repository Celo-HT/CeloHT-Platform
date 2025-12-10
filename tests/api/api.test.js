const request = require("supertest");
const app = require("../../api/server");

describe("API Endpoints", () => {
  it("GET /health should return 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "ok");
  });
});