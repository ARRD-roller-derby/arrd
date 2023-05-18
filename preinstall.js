const fs = require('fs')
if (process.env.NODE_ENV !== 'production') {
  console.log('Loading dotenv')
  require('dotenv').config()
}
const token = process.env.FONTAWESOME_NPM_AUTH_TOKEN
console.log('FONTAWESOME_NPM_AUTH_TOKEN: ' + token)
if (!token) {
  console.error('FONTAWESOME_NPM_AUTH_TOKEN environment variable is not set')
  process.exit(1)
}

fs.writeFileSync(
  '.npmrc',
  `
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=${token}
`
)
