const logger = require("../config/logging");
const { ceasar } = require("./helpers");

/**
 * Decrypt message
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const decrypt = (req, res) => {
  try {
    const { encrypted_message, key } = req.query;

    const decryptMsg = ceasar(encrypted_message, key, "-");

    res.send(decryptMsg);
  } catch (error) {
    logger.error(error.message);
    res.status(400).json(error.message);
  }
};

module.exports = decrypt;
