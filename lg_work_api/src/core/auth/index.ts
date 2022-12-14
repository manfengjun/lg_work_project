import Koa from 'koa'
import jwt from 'jsonwebtoken'
import CONFIG from '../../config'

let unlessPaths = [
  /^\/work\/v1\/json\.html[\/#\?]?$/i,
  /^\/work\/v1\/doc\.html[\/#\?]?$/i,
  /^\/work\/v1\/user\/login[\/#\?]?$/i,
  /^\/work\/v1\/user\/register[\/#\?]?$/i
]

export default async function auth(ctx: Koa.Context, next: any) {
  if (!_isUnless(ctx.path)) {
    _verifyBearerToken(ctx.header.authorization)
  }
  await next()
}

export function generateToken(payload: string) {
  const token = jwt.sign({ payload }, CONFIG.SECRET.JWT_KEY, {
    expiresIn: CONFIG.SECRET.EXPIRES_IN
  })
  return token
}

export function verifyToken(token: string) {
  try {
    jwt.verify(token, CONFIG.SECRET.JWT_KEY, {
      complete: true
    })
  } catch (error) {
    global.UnifyResponse.unAuthenticatedException(10004)
  }
}

function _verifyBearerToken(bearerToken: string | undefined) {
  if (!bearerToken) {
    global.UnifyResponse.unAuthenticatedException(10004)
  }

  const tokens = bearerToken?.split(' ') as string[]
  if (!(tokens?.length === 2)) {
    global.UnifyResponse.unAuthenticatedException(10004)
  }
  if (tokens[0] !== 'Bearer') {
    global.UnifyResponse.unAuthenticatedException(10004)
  }

  verifyToken(tokens[1])
}

function _isUnless(path: string) {
  return unlessPaths.some((item) => item.test(path))
}
