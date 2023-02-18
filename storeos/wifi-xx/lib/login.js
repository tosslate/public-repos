const querystring = require('querystring')
const cryptojs = require('cryptojs')
const axios = require('axios')
const store = require('./store')
const key = store.get('key')
const baseURL = store.get('base.url')
const deviceId = store.get('device.id')

function time() {
  return Math.floor(new Date().getTime() / 1000)
}

function random() {
  return Math.floor(Math.random() * 10000)
}

function nonce(...args) {
  return [0].concat(args).join('_')
}

function sha1(...args) {
  return cryptojs.Crypto.SHA1(...args).toString()
}

function login({ username, password }) {
  const _nonce = nonce(deviceId, time(), random())
  const _sha1 = sha1(_nonce + sha1(password + key))

  return axios.post(
    `${baseURL}/api/xqsystem/login`,
    querystring.stringify({
      username,
      password: _sha1,
      logtype: 2,
      nonce: _nonce
    })
  )
}

module.exports = login
