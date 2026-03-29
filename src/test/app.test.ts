import request from "supertest";
import { app } from "../server";

describe("GET /", () => {
  it("should return service message", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Payment Service Running");
  });
});
