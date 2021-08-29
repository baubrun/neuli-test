const winston = require("winston");
const { format } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp}  ${level}: ${message}`;
});

const options = {
  file: {
    level: "info",
    filename: "logfile.log",
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    colorize: true,
    json: true,
    format: combine(timestamp({ format: "YYYY-DD-MM hh:mm:ss" }), myFormat),
  },
};

const logger = new winston.createLogger({
  transports: [new winston.transports.File(options.file)],
});

module.exports = logger;
