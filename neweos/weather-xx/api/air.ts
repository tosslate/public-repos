import type { VercelRequest, VercelResponse } from '@vercel/node'
import { air, keyAuth } from '@tossdev/weather'
import statuses from 'statuses'

async function handler(request: VercelRequest, response: VercelResponse) {
  const { location } = request.query
  const data = await air.now(location as string)

  return data['pm25']
    ? response.json(data)
    : response.status(404).json({ message: statuses(404) })
}

export default keyAuth(handler)
