const inquirer = require('inquirer')
const chalk = require('chalk')
const login = require('../login')
const store = require('../store')
const description = 'Login account'

async function handler() {
  const input = await inquirer.prompt([
    { name: 'username', default: 'admin', message: 'Enter username:' },
    { name: 'password', type: 'password', message: 'Enter password:' }
  ])

  try {
    const { data } = await login(input)
    const { code, token } = data || {}

    if (code === 0) {
      store.set('token', token)
      console.log(chalk.green('Login successfully'))
    } else {
      console.log(data)
    }
  } catch (error) {}
}

module.exports = {
  description,
  handler
}
