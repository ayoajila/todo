const { createLogger, transports, format } = require('winston')
const { combine, timestamp, label, printf } = format
const appRoot = require('app-root-path')

const loggingFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

const winston_file_handleExecptions = (process.env.winston_file_handleExecptions == 'true') || true
const winston_file_json = (process.env.winston_file_json == 'true') || true
const winston_file_maxsize = process.env.winston_file_maxsize || 5242880
const winston_file_maxFiles = process.env.winston_file_maxFiles || 5
const winston_file_colorize = 'true'

// define settings for transports.
const options = {
  error: {
    level: 'error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: winston_file_handleExecptions,
    json: winston_file_json,
    maxsize: parseInt(winston_file_maxsize), 
    maxFiles: parseInt(winston_file_maxFiles),
    colorize: winston_file_colorize,
  },
  info: {
    level: 'info',
    filename: `${appRoot}/logs/info.log`,
    handleExceptions: winston_file_handleExecptions,
    json: winston_file_json,
    maxsize: parseInt(winston_file_maxsize), 
    maxFiles: parseInt(winston_file_maxFiles),
    colorize: winston_file_colorize,
  },
  debug: {
    level: 'debug',
    filename: `${appRoot}/logs/debug.log`,
    handleExceptions: winston_file_handleExecptions,
    json: winston_file_json,
    maxsize: parseInt(winston_file_maxsize), 
    maxFiles: parseInt(winston_file_maxFiles),
    colorize: winston_file_colorize,
  },
  console: {
    level: process.env.winston_console_level,
    handleExceptions: winston_file_handleExecptions,
    json: winston_file_json,
    colorize: winston_file_colorize,
  },
}

let transportsArray = []

// note, you may need to create a http transport for production environments instead.
if (process.env.NODE_ENV === 'production')
  transportsArray.push(
    new transports.File(options.error),
    new transports.File(options.info),
    new transports.File(options.debug),
  )
else
  transportsArray.push(
    new transports.Console(options.console),
    new transports.File(options.error),
    new transports.File(options.info),
    new transports.File(options.debug),
  )

// instantiate a new winston logger.
let logger = new createLogger({
  transports: transportsArray,
  exitOnError: false,
  format: combine(label({ label: 'expressbase' }), timestamp(), loggingFormat),
})

// create a stream object that will be used by morgan.
logger.stream = {
  write: function(message) {
    logger.info(message)
  },
}

module.exports = logger
