import { defineTask } from '@tossdev/remix'

export const emojiTask = defineTask({
  name: 'emoji',
  about: 'Find emojis',
  handler(args, opts) {
    const emojis = require('emojilib')
    const keyword = args[1] || 'hello'

    Object.keys(emojis)
      .filter((key) => emojis[key].includes(keyword))
      .map((key) => console.log(`${key} {${emojis[key].join('|')}}`))
  }
})
