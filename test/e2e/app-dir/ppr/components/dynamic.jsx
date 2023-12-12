import React, { use } from 'react'
import { cookies, headers } from 'next/headers'
import { Login } from './state'

export const DELAY_HEADER = 'x-delay'

export function Dynamic({ fallback }) {
  const dynamic = fallback !== true

  if (!dynamic) {
    return (
      <div id="dynamic-fallback">
        <pre>Loading...</pre>
        <Login fallback />
      </div>
    )
  }

  const jar = cookies()
  const signedIn = jar.has('session') ? true : false

  const req = { headers: headers() }
  const delay = req.headers.has(DELAY_HEADER)
    ? parseInt(req.headers.get(DELAY_HEADER))
    : 0
  if (delay) {
    use(new Promise((resolve) => setTimeout(resolve, delay)))
  }

  return (
    <div id="dynamic">
      <pre id="state" className={signedIn ? 'bg-green-600' : 'bg-red-600'}>
        {signedIn ? 'Signed In' : 'Not Signed In'}
      </pre>
      <Login signedIn={signedIn} />
    </div>
  )
}
