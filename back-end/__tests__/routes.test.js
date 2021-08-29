const request = require("supertest");
const app = require("../app");

const message = "Message de test";
const encrypted = "Oguucig fg vguv";

describe("Routes", () => {
  it("/api/encrypt/ should return encrypted message", async () => {
    const response = await request(app)
      .get(`/api/encrypt?encrypted_message=${message}&key=2`)
      .send(encrypted)
      .expect(200)
      .expect("Content-Type", "text/html; charset=utf-8");
    expect(response.text).toEqual(encrypted);
  });

  it("/api/decrypt/ should return decrypted message", async () => {
    const response = await request(app)
      .get(`/api/decrypt?encrypted_message=${encrypted}&key=2`)
      .send(message)
      .expect(200)
      .expect("Content-Type", "text/html; charset=utf-8");
    expect(response.text).toEqual(message);
  });
});
