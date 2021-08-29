const express = require("express");
const router = express.Router();

const encrypt = require("../controllers/encrypt");

router.get("/", encrypt);

module.exports = router;
