import * as request from "supertest";
import app from "../src";
import User from "../src/models/user.model";

let authToken: string;

beforeAll(async () => {
    await request(app)
        .post("/v1/auth/register")
        .send({ email: "test+182@gmail.com", username: "test user", password: "test@123" });

    const res = await request(app)
        .post("/v1/auth/login")
        .send({ email: "test+182@gmail.com", password: "test@123" });

    authToken = res.body.data.accessToken;
});

afterAll(async () => {
    await User.destroy({ where: { email: "test+182@gmail.com" } });
});

describe("Idea API", () => {

    test("submit new Idea without auth token", async () => {
        const res = await request(app)
            .post("/v1/idea")
            .send({
                "title": "test",
                "description": "test dec"
            });
        expect(res.status).toBe(401);
    });

    test("submit new Idea with auth token", async () => {
        const res = await request(app)
            .post("/v1/idea")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
                "title": "test",
                "description": "test dec"
            });

        console.log("res.body", res);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Idea submitted");
    });

    test("User try to access admin API's", async () => {
        const res = await request(app).delete("/v1/admin/idea/6")
            .set("Authorization", `Bearer ${authToken}`);

        expect(res.status).toBe(403);
        expect(res.body.message).toBe("Insufficient permissions");

    });

    test("user fetch all ideas", async () => {
        const res = await request(app).get("/v1/idea")
            .set("Authorization", `Bearer ${authToken}`);

        expect(res.status).toBe(200);
        expect(res.body.data.ideas).toBeInstanceOf(Array);
    });
});