import type { VercelRequest, VercelResponse } from '@vercel/node'
import { weather, keyAuth } from '@tossdev/weather'

async function handler(request: VercelRequest, response: VercelResponse) {
  const { location } = request.query

  try {
    const data = await weather.forecast(location as string)
    return response.json(data)
  } catch ({ message }) {
    return response.status(403).json({ message })
  }
}

export default keyAuth(handler)
