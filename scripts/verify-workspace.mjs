import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const requiredFiles = [
  'package.json',
  'index.html',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'vite.config.ts',
  'src/main.tsx',
  'src/App.tsx',
  'src/types.ts',
  'src/utils.ts',
]

const missing = requiredFiles.filter((relativePath) => {
  const absolutePath = path.join(root, relativePath)
  return !existsSync(absolutePath) || !statSync(absolutePath).isFile()
})

if (missing.length) {
  console.error('Workspace incompleto: faltan archivos de la aplicación:')
  for (const relativePath of missing) console.error(`- ${relativePath}`)
  console.error(`\nRuta detectada: ${root}`)
  console.error('Restaura el contenido completo del proyecto antes de ejecutar npm run build.')
  process.exit(1)
}

console.log(`Workspace válido: ${root}`)
console.log(`Archivos fuente presentes: ${requiredFiles.filter((file) => file.startsWith('src/')).length}`)
