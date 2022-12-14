const { createLogger, transports, format } = require("winston");
const { combine, timestamp, printf, label, simple, colorize } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFotmat = {
  file: combine(
    label({
      label: "백엔드 로그인 & 회원가입 기능 구현",
    }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:dd",
    }),
    printFormat
  ),
  console: combine(colorize(), simple()),
};

const opts = {
  file: new transports.File({
    filename: "access.log",
    dirname: "./logs",
    level: "info",
    format: printLogFotmat.file,
  }),
  console: new transports.Console({
    level: "info",
    format: printLogFotmat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(opts.console);
}

// logger.stream = {
//   write: (message) => logger.info(message),
// }; // morgan에 전달

module.exports = logger;
