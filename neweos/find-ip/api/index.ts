import type { VercelRequest, VercelResponse } from '@vercel/node'
import isEmpty from 'lodash/isEmpty'
import dns from 'node:dns/promises'

async function dnsLookup(domain: string) {
  try {
    return await dns.lookup(domain, { all: true })
  } catch ({ message }) {
    return { message }
  }
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const address = request.headers['x-real-ip']
  const domain = (request.query.domain ||
                  request.query.d)

  return isEmpty(domain)
    ? response.json({ address })
    : response.json(await dnsLookup(domain as string))
}
