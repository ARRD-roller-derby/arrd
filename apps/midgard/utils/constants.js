require('dotenv').config()

const DEPLOY_TYPE = process.env.DEPLOY_TYPE || 'production'

const DISCORD_TOKEN =
  DEPLOY_TYPE !== 'production'
    ? process.env.DISCORD_TOKEN_DEV
    : process.env.DISCORD_TOKEN
const DISCORD_CLIENT_ID =
  DEPLOY_TYPE !== 'production'
    ? process.env.DISCORD_CLIENT_ID_DEV
    : process.env.DISCORD_CLIENT_ID
const DISCORD_GUILD_ID =
  DEPLOY_TYPE !== 'production'
    ? process.env.DISCORD_GUILD_ID_DEV
    : process.env.DISCORD_GUILD_ID
const MONGO_URI =
  DEPLOY_TYPE !== 'production'
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI

const MONGO_URI_NJORD = process.env.MONGO_URI_NJORD || ''

const S3_BUCKET = process.env.S3_BUCKET || ''
const S3_DOMAIN = process.env.S3_DOMAIN || ''
const S3_KEY = process.env.S3_KEY || ''
const S3_REGION = process.env.S3_REGION || ''
const S3_PRIVATE = process.env.S3_PRIVATE || ''
const S3_PUBLIC_ENDPOINT = process.env.S3_PUBLIC_ENDPOINT || ''
const S3_ENDPOINT = process.env.S3_ENDPOINT || ''

const SHORTER_SIGN = process.env.SHORTER_SIGN || ''
const SHORTER_URL = process.env.SHORTER_URL || ''
const S3_OLD_BUCKET = process.env.S3_OLD_BUCKET || ''
const CHAT_GPT_API = process.env.CHAT_GPT_API || ''

module.exports = {
  DISCORD_TOKEN: DISCORD_TOKEN || '',
  DISCORD_CLIENT_ID: DISCORD_CLIENT_ID || '',
  DISCORD_GUILD_ID: DISCORD_GUILD_ID || '',
  MONGO_URI: MONGO_URI || '',
  DEPLOY_TYPE: process.env.DEPLOY_TYPE || 'production',
  MONGO_URI_NJORD,
  S3_BUCKET,
  S3_DOMAIN,
  S3_KEY,
  S3_REGION,
  S3_PRIVATE,
  S3_PUBLIC_ENDPOINT,
  S3_ENDPOINT,
  SHORTER_SIGN,
  SHORTER_URL,
  S3_OLD_BUCKET,
  CHAT_GPT_API,
}
