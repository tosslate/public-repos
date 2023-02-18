const store = require('../store')
const description = 'Configuration'

function handler(argv) {
  store.set(argv._[1], argv._[2])
}

module.exports = {
  description,
  handler
}
