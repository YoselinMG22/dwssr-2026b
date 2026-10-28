
import winston from 'winston';
import path from 'node:path';
import fs from 'node:fs';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, colorize, label, timestamp, printf } = winston.format;

const colors = {
  info: 'green',
  http: 'magenta',
  debug: 'blue',
  error: 'red',
  warn: 'yellow',
};

winston.addColors(colors);

const rootdir = path.resolve(process.cwd());
const logsDir = path.join(rootdir, 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const myConsoleFormat = combine(
  colorize({ all: true }),
  label({ label: 'dwssr-2026b' }),
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  printf(
    (info) =>
      `${info.timestamp} ${info.level} [${info.label}] ${info.message}`,
  ),
);

const myFileFormat = combine(
  winston.format.uncolorize(),
  timestamp(),
  winston.format.json(),
);

const options = {
  errorFile: {
    level: 'error',
    filename: path.join(logsDir, 'error.log'),
    maxsize: 5242880,
    maxFiles: 2,
    format: myFileFormat,
  },

  console: {
    level: 'debug',
    handleExceptions: true,
    format: myConsoleFormat,
  },

  readableFile: {
    level: 'info',
    filename: path.join(logsDir, 'readable.log'),
    maxsize: 5242880,
    maxFiles: 2,
    format: combine(
      winston.format.uncolorize(),
      timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      winston.format.prettyPrint(),
    ),
  },

  dailyRotateFile: {
    level: 'info',
    filename: path.join(logsDir, 'app-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxsize: 5242880,
    maxFiles: 2,
    format: myFileFormat,
  },
};

// Creando el logger.
const logger = winston.createLogger({
  transports: [
    new DailyRotateFile(options.dailyRotateFile),
    new winston.transports.File(options.readableFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],

  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'exceptions.log'),
      format: myFileFormat,
    }),
  ],

  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'rejections.log'),
      format: myFileFormat,
    }),
  ],

  exitOnError: false,
});

export default logger;