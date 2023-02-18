import { defineTask } from '@tossdev/remix'
import { setup } from '../index'
import { build } from 'vite'

export const buildTask = defineTask({
  name: 'build',
  about: 'Build for production',
  handler(args, opts) {
    async function runTask() {
      await setup()
      await build()
    }

    runTask().catch(console.error)
  }
})
