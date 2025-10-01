import { Request } from 'express-serve-static-core'

export const getIp = (req: Request) => {
  const ip = ((req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '').split(',')[0].trim()

  if (!ip) {
    throw new Error('Невозможно определить IP')
  }

  return ip
}
