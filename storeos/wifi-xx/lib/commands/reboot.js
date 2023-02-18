const ora = require('ora')
const axios = require('axios')
const delay = require('delay')
const store = require('../store')
const token = store.get('token')
const baseURL = store.get('base.url')
const description = 'Reboot router'

async function handler() {
  const spinner = ora('Waiting for the router restart').start()

  try {
    const { data } = await axios.get(
      `${baseURL}/;stok=${token}/api/xqsystem/reboot?client=web`
    )
    const { code } = data || {}

    if (code === 0) {
      await delay(10_000)
      const _interval = setInterval(async () => {
        try {
          await axios.get(`${baseURL}/api/xqsystem/login`)
          spinner.text = 'Reboot successfully'
          spinner.color = 'green'
          clearInterval(_interval)
          await delay(1_000)
          spinner.stop()
        } catch (error) {}
      }, 1_000)
    } else {
      spinner.stop()
      console.log(data)
    }
  } catch (error) {}
}

module.exports = {
  description,
  handler
}
