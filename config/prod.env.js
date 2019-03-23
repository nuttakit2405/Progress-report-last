'use strict'

const dotenv = require('dotenv')
dotenv.load()

module.exports = {
  NODE_ENV: '"production"',
  API_KEY: `"${process.env.API_KEY}"`,
  AUTH_DOMAIN: `"${process.env.AUTH_DOMAIN}"`,
  DATABASE_URL: `"${process.env.DATABASE_URL}"`,
  PROJECT_ID: `"${process.env.PROJECT_ID}"`,
  STORAGE_BUCKET: `"${process.env.STORAGE_BUCKET}"`,
  MESSAGING_SENDER_ID: `"${process.env.MESSAGING_SENDER_ID}"`,
  PROGRESS_REPORT_SERVICE: `"${process.env.PROGRESS_REPORT_SERVICE}"`
}
