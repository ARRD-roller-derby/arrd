require('dotenv').config()
const fs = require('fs');
const { execSync } = require('child_process');

const token = process.env.FONTAWESOME_NPM_AUTH_TOKEN;
if (!token) {
  console.error('FONTAWESOME_NPM_AUTH_TOKEN environment variable is not set');
  process.exit(1);
}

fs.writeFileSync('.npmrc', `
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=${token}
`);