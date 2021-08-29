const app = require("./app");
const config = require("./config");
const logger = require("./config/logging");

/*================
app 
===================*/

app.listen(config.port, () => {
  logger.info(`Server running on port: ${config.port}`);
});

module.exports = app;
