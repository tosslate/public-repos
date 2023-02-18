const milliseconds = require('pretty-ms')
const bytes = require('pretty-bytes')

function prettySeconds(_seconds) {
  return milliseconds(Number(_seconds) * 1_000)
}

function prettyBytes(_bytes) {
  return bytes(Number(_bytes))
}

module.exports = {
  prettySeconds,
  prettyBytes
}
