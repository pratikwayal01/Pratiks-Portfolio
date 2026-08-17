// Vercel Routing Middleware — framework-agnostic.
// curl/wget/HTTPie get plain-text terminal output; browsers pass through to the SPA.
import { isTerminalRequest, terminalResponse } from './terminal-content'

export const config = {
  matcher: ['/', '/about', '/skills', '/projects', '/contact', '/help', '/resume', '/hire'],
}

export default function middleware(request: Request): Response {
  const ua = request.headers.get('user-agent') ?? ''
  if (!isTerminalRequest(ua)) {
    // pass through to the SPA / vercel.json rewrites
    return new Response(null, { headers: { 'x-middleware-next': '1' } })
  }

  const { pathname } = new URL(request.url)
  return new Response(terminalResponse(pathname), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
