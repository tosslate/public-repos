import { table, getBorderCharacters } from 'table'
import { defineTask } from '@tossdev/remix'
import pbs from 'pretty-bytes'
import ms from 'ms'
import os from 'os'

function render(data: unknown[][]) {
  console.log(
    table(data, {
      border: getBorderCharacters('norc')
    })
  )
}

export const archeyTask = defineTask({
  name: 'archey',
  about: 'Show system info',
  handler(args, opts) {
    if (opts.user) {
      const { username, homedir, shell } = os.userInfo()
      return render([
        ['username', username],
        ['homedir', homedir],
        ['shell', shell]
      ])
    }

    if (opts.network) {
      const data = os
        .networkInterfaces()
        .wlp2s0?.map(({ address, family }) => [family, address])

      return render(data)
    }

    render([
      ['os.arch', os.arch()],
      ['os.cpus', os.cpus()[0].model],
      ['os.platform', os.platform()],
      ['os.release', os.release()],
      ['os.freemem', pbs(os.freemem())],
      ['os.totalmem', pbs(os.totalmem())],
      ['os.uptime', ms(os.uptime() * 1_000)]
    ])
  }
})
