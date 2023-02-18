const Store = require('configstore')
const { name } = require('../package')

module.exports = new Store(name)
