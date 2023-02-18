const Table = require('cli-table')
const axios = require('axios')
const store = require('../store')
const utils = require('../utils')
const token = store.get('token')
const baseURL = store.get('base.url')
const description = 'List devices'

async function handler() {
  const table = new Table({
    head: ['NAME', 'MAC', 'ONLINE'],
    colAligns: ['left', 'left', 'right']
  })

  try {
    const { data } = await axios.get(
      `${baseURL}/;stok=${token}/api/misystem/devicelist`
    )
    const { code, list } = data || {}

    if (code === 0) {
      const devices = list.map(({ name, mac, statistics: { online } }) => [
        name,
        mac,
        utils.prettySeconds(online)
      ])

      table.push(...devices)
      console.log(table.toString())
    } else {
      console.log(data)
    }
  } catch (error) {}
}

module.exports = {
  description,
  handler
}
