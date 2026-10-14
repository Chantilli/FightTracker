import { spawn } from 'node:child_process'
import { createConnection } from 'node:net'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const host = '127.0.0.1'
const port = Number(process.env.PORT || 5173)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function isPortOpen() {
  return new Promise((resolve) => {
    const socket = createConnection({ host, port })
    socket.once('connect', () => {
      socket.destroy()
      resolve(true)
    })
    socket.once('error', () => resolve(false))
  })
}

async function existingAppResponds() {
  try {
    const response = await fetch(`http://${host}:${port}/`, {
      signal: AbortSignal.timeout(1500),
      headers: { 'User-Agent': 'ronda-dev-healthcheck' },
    })
    const body = await response.text()
    return response.ok && body.includes('<div id="root"></div>')
  } catch {
    return false
  }
}

if (await isPortOpen()) {
  if (await existingAppResponds()) {
    console.log(`Ronda ya está disponible en http://localhost:${port}; se reutiliza el proceso existente.`)
    process.exit(0)
  }
  console.error(`El puerto ${port} ya está ocupado por otro proceso. No se detuvo ni reemplazó.`)
  console.error(`Comprueba el proceso dueño y usa PORT=5174 npm run dev si necesitas otra instancia.`)
  process.exit(1)
}

const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js')
const child = spawn(process.execPath, [viteBin, '--host', '0.0.0.0', '--port', String(port)], {
  cwd: root,
  stdio: 'inherit',
})
child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  else process.exit(code ?? 0)
})
