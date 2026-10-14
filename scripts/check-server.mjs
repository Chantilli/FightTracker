const port = Number(process.env.PORT || 5173)
const baseUrl = process.env.APP_URL || `http://127.0.0.1:${port}`
const routes = ['/', '/index.html', '/manifest.webmanifest', '/sw.js']

let failed = false
for (const route of routes) {
  try {
    const response = await fetch(new URL(route, baseUrl), {
      signal: AbortSignal.timeout(2500),
      headers: { 'User-Agent': 'ronda-server-check' },
    })
    const body = await response.text()
    const validShell = route === '/' || route === '/index.html'
      ? body.includes('<div id="root"></div>')
      : body.length > 0
    if (!response.ok || !validShell) {
      failed = true
      console.error(`FAIL ${response.status} ${route}`)
    } else {
      console.log(`OK   ${response.status} ${route}`)
    }
  } catch (error) {
    failed = true
    console.error(`FAIL ${route}: ${error.message}`)
  }
}

if (failed) process.exit(1)
