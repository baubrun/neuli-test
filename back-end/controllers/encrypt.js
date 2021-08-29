const logger = require("../config/logging");
const { ceasar } = require("./helpers");

/**
 *  Encrypt message
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const encrypt = (req, res) => {
  try {
    const { encrypted_message, key } = req.query;

    const encryptMsg = ceasar(encrypted_message, key, "+");

    res.send(encryptMsg);
  } catch (error) {
    logger.error(error.message);
    res.status(400).json(error.message);
  }
};

module.exports = encrypt;
