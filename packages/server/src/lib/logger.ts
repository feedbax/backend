import winston, { createLogger, format, transports } from 'winston';

const otherProps = { maxFiles: 2, maxsize: 10000000, tailable: true };

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.File({ filename: 'fbx-backend-error.log', level: 'error', ...otherProps }),
    new transports.File({ filename: 'fbx-backend-combined.log', ...otherProps }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    }),
  );
}

const log = (logFn: winston.LeveledLogMethod, ...args: any[]): void => {
  const string = args.join(' - ');
  logFn(string);
};

export const info = (...args: any[]): void => {
  log(logger.info, ...args);
};

export const debug = (...args: any[]): void => {
  log(logger.debug, ...args);
};

export const error = (...args: any[]): void => {
  log(logger.error, ...args);
};

export default logger;
