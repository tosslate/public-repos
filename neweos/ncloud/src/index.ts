import type { CloudOpts } from './cloud'
import { Cloud } from './cloud'

export function ncloud(options: CloudOpts) {
  return new Cloud(options)
}
