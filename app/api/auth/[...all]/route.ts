import type { NextRequest } from "next/server"

export const runtime = "nodejs"

async function getAuthHandlers() {
  const [{ toNextJsHandler }, { auth }] = await Promise.all([
    import("better-auth/next-js"),
    import("@/lib/auth"),
  ])

  return toNextJsHandler(auth)
}

export async function GET(request: NextRequest) {
  const { GET: handler } = await getAuthHandlers()
  return handler(request)
}

export async function POST(request: NextRequest) {
  const { POST: handler } = await getAuthHandlers()
  return handler(request)
}
