const Table = require('cli-table')
const axios = require('axios')
const store = require('../store')
const token = store.get('token')
const baseURL = store.get('base.url')
const description = 'Show info'

async function handler() {
  const table = new Table({
    head: ['SSID', 'PASSWORD', 'MODE']
  })

  try {
    const {
      data: { pppoename, password, proto }
    } = await axios.get(`${baseURL}/;stok=${token}/api/xqnetwork/pppoe_status`)
    const {
      data: { code, info }
    } = await axios.get(
      `${baseURL}/;stok=${token}/api/xqnetwork/wifi_detail_all`
    )

    if (code === 0) {
      table.push([info[0].ssid, info[0].password, info[0].mode])
      table.push([pppoename, password, proto])
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
