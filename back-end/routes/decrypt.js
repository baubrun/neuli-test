const express = require("express");
const router = express.Router();

const decrypt = require("../controllers/decrypt");

router.get("/", decrypt);

module.exports = router;
