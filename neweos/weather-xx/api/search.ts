import type { VercelRequest, VercelResponse } from '@vercel/node'
import { city, keyAuth } from '@tossdev/weather'

async function handler(request: VercelRequest, response: VercelResponse) {
  const { location } = request.query
  const data = await city.lookup(location as string)

  return response.json(data)
}

export default keyAuth(handler)
