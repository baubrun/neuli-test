const express = require("express");
const app = express();
const cors = require("cors");

const encryptRoute = require("../routes/encrypt");
const decryptRoute = require("../routes/decrypt");

/*=============
 Middleware 
 ==============*/
app.use(express.json());
app.use(cors());

/*=============
 Routes 
 ==============*/
app.use("/api/encrypt", encryptRoute);
app.use("/api/decrypt", decryptRoute);

module.exports = app;
