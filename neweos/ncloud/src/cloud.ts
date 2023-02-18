import type { ClientOpts } from './client'
import { Client } from './client'

export type CloudOpts = ClientOpts & {
  prefix?: string
  debug?: boolean
}

export class Cloud {
  readonly client: Client
  readonly prefix: string

  constructor({ appId, appKey, masterKey, prefix, debug }: CloudOpts) {
    this.client = new Client({ appId, appKey, masterKey })
    this.prefix = prefix || 'ln_'

    if (this.debug || debug) {
      this.client.debug()
    }
  }

  dataset(identifier: string) {
    return this.client.dataset(`${this.prefix}${identifier}`)
  }

  private get debug() {
    return process.env.DEBUG === 'axios'
  }
}
