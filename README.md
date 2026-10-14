# Ronda - Combat training log

MVP offline-first y PWA instalable para registrar entrenamientos de BJJ,
Wrestling, Muay Thai, Box y MMA. Se instala como app independiente en
telefono o desktop; no requiere backend ni Electron.

## Ejecutar en Codespaces

```bash
cd /workspaces/FightTracker/combat-training-log
npm ci
npm run verify:workspace
npm run dev
```

El servidor de desarrollo escucha en `0.0.0.0:5173`, requisito para que
Codespaces pueda reenviar el puerto. Abre **Ports**, localiza `5173` y usa
**Open in Browser**.

`npm run dev` es idempotente: si 5173 ya esta sirviendo Ronda, informa que
reutiliza el proceso existente y termina sin levantar un segundo servidor. Si
5173 pertenece a otro servicio, no lo detiene; usa una instancia alternativa:

```bash
PORT=5174 npm run dev
```

En PowerShell:

```powershell
$env:PORT=5174; npm run dev
```

## Build y preview de produccion

```bash
npm run build
npm run preview
npm run check:server
```

`npm run preview` tambien escucha en `0.0.0.0:5173` y sirve `dist`. `check:server`
comprueba `/`, `/index.html`, `/manifest.webmanifest` y `/sw.js`, mostrando
`OK 200` para cada ruta.

## Corregir un forward 404

Si la URL forwarded muestra 404 pero el servidor local responde 200, el forward
esta stale. Comprueba primero el servidor sin detener procesos:

```bash
cd /workspaces/FightTracker/combat-training-log
npm run verify:workspace
npm run check:server
```

Luego, en **Ports**:

1. Abre el menu `...` de `5173` y elige **Stop Forwarding** o **Remove Port**.
2. Vuelve a ejecutar `npm run check:server`; no cierres terminales ni mates
   procesos.
3. Pulsa **Forward a Port**, introduce `5173` y elige **Open in Browser** en
   la nueva fila.
4. Si sigue en 404, usa **Stop Forwarding**, recarga la ventana de Codespaces y
   crea otra vez el forward. Esto recrea solo el tunel.

Con GitHub CLI autenticado, puedes inspeccionar los forwards sin modificarlos:

```bash
gh codespace ports -c "$CODESPACE_NAME"
```

No uses `kill`, `pkill` ni `taskkill` a ciegas. Si 5173 esta ocupado por otro
servicio, usa `PORT=5174 npm run dev` y forwardea 5174.

## Checkout completo

Si aparece `TS18003: No inputs were found`, el checkout no tiene `src`. Los
archivos `src/main.tsx`, `src/App.tsx`, `src/types.ts` y `src/utils.ts` deben
estar al mismo nivel que `package.json` y `tsconfig.app.json`:

```bash
pwd
npm run verify:workspace
find src -maxdepth 1 -type f
```

No ejecutes `npm install` o `npm run build` desde otra carpeta vacia.

## Si el Codespace solo tiene `/workspaces/FightTracker`

No asumas que `combat-training-log` existe. Primero descubre que checkout fue
montado y su remoto:

```bash
cd /workspaces/FightTracker
pwd
git rev-parse --show-toplevel 2>/dev/null || true
git remote -v 2>/dev/null || true
find /workspaces -maxdepth 4 -type f -name package.json -print
find /workspaces -maxdepth 4 -type d -name .git -print
```

Si `git remote -v` muestra el repositorio correcto, vuelve a sincronizarlo sin
suponer una subcarpeta:

```bash
cd /workspaces/FightTracker
git fetch origin
git branch --show-current
git pull --ff-only origin main
npm ci
npm run verify:workspace
npm run build
npm run test
```

Si `/workspaces/FightTracker` no es un repositorio o no tiene el proyecto,
obtén la URL real del repositorio desde **Source Control** / **Codespaces
Details** y clónalo explícitamente:

```bash
cd /workspaces
git clone https://github.com/OWNER/REPOSITORY.git FightTracker
cd FightTracker
test -f package.json && test -d src
npm ci
npm run verify:workspace
npm run build
npm run test
npm run dev
```

Sustituye `OWNER/REPOSITORY` por el repositorio que realmente usa el Codespace;
no uses `combat-training-log` como nombre de carpeta salvo que el remoto
contenga ese proyecto. Si el repositorio correcto ya existe en otra carpeta,
usa `git -C RUTA remote get-url origin` para identificarlo y trabaja desde esa
ruta.

El origen de esta copia local está listo en la rama `main`, commits
`0b6333a` y `b23b375`, e incluye `src`, `public`, `scripts`, `package.json` y
la configuración completa. Este entorno no tiene un remote configurado, por lo
que no se puede hacer `git push` sin conocer la URL `OWNER/REPOSITORY`.

## PWA offline

La build genera `dist/manifest.webmanifest`, `dist/sw.js` e iconos. El service
worker cachea el shell y recursos visitados; los datos permanecen en
`localStorage`.

En Android Chrome: abre por HTTPS, pulsa **Instalar app** o usa el menu
`... > Instalar aplicacion`. En Chrome/Edge desktop usa el boton de instalacion
o el icono de instalacion de la barra de direcciones. En iPhone/iPad usa
**Compartir > Anadir a pantalla de inicio**.

La app carga datos de ejemplo la primera vez. Usa **Borrar datos de ejemplo**
para restablecerlos. La captura por voz usa Web Speech API cuando el navegador
la expone y mantiene entrada de texto como fallback.
