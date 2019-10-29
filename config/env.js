const fs = require('fs')

function readEnv (envFile = '.env') {
  const file = fs.readFileSync(envFile).toString()
  const lines = file.split('\n').filter(line => line.length)
  const keyValuePairs = lines.map(line => line.split('='))
  const variables = keyValuePairs.map(([key, value]) => ({ [key]: value }))
  return Object.assign.apply(null, variables)
}

function loadEnv (envFile) {
  const env = readEnv(envFile)
  Object.assign(process.env, env)
  return env
}

module.exports = { readEnv, loadEnv }
