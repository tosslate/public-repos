const Table = require('cli-table')
const axios = require('axios')
const store = require('../store')
const utils = require('../utils')
const token = store.get('token')
const baseURL = store.get('base.url')
const description = 'Show status'

async function handler() {
  const table = new Table({
    head: ['NAME', 'MAC', 'ONLINE', 'DOWNLOAD'],
    colAligns: ['left', 'left', 'right', 'right']
  })

  try {
    const { data } = await axios.get(
      `${baseURL}/;stok=${token}/api/misystem/status`
    )
    const { code, dev } = data || {}

    if (code === 0) {
      const devices = dev.map(({ devname, mac, online, download }) => [
        devname,
        mac,
        utils.prettySeconds(online),
        utils.prettyBytes(download)
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
