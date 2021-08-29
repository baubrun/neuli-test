const { ceasar } = require("../controllers/helpers");

describe("Ceasar", () => {
  it("should encrypt message", () => {
    const msg = "Message de test";
    const encrypt = ceasar(msg, 2, "+");
    expect(encrypt).toEqual("Oguucig fg vguv");
  });
  it("should not encrypt message", () => {
    const msg = "Message de test";
    const encrypt = ceasar(msg, 2, "+");
    expect(encrypt).not.toEqual("Oguucigfgasdf");
  });

  it("should decrypt message", () => {
    const msg = "Oguucig fg vguv";
    const encrypt = ceasar(msg, 2, "-");
    expect(encrypt).toEqual("Message de test");
  });
});
