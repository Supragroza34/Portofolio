import { SignJWT, jwtVerify } from 'jose'
import type { VercelRequest } from '@vercel/node'

function secretKey() {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET is not set')
  return new TextEncoder().encode(secret)
}

export async function signToken(username: string): Promise<string> {
  return new SignJWT({ sub: username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey())
}

export async function requireAuth(req: VercelRequest): Promise<string> {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    throw new AuthError('Missing bearer token')
  }
  const token = header.slice('Bearer '.length)
  try {
    const { payload } = await jwtVerify(token, secretKey())
    return payload.sub as string
  } catch {
    throw new AuthError('Invalid or expired token')
  }
}

export class AuthError extends Error {}
