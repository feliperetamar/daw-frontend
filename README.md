# Dev Container para Desarrollo Frontend

Entorno de desarrollo en contenedor para la asignatura de desarrollo frontend
(Vanilla JS + HTML/CSS, con soporte para TypeScript), usando **Podman** como
motor de contenedores y **VS Code** con la extensión Dev Containers.

## Contenido

- `.devcontainer/Containerfile` — imagen base `docker.io/library/node:26`
  (Node.js 26 sobre Debian Trixie, la misma base que Debian 13).
- `.devcontainer/devcontainer.json` — configuración del contenedor: usuario,
  puertos, extensiones y ajustes de VS Code.

## Extensiones incluidas

Sin IA, solo autocompletado clásico y herramientas de corrección/compilación:

| Extensión | Para qué sirve |
|---|---|
| `ritwickdey.LiveServer` | Servidor local con recarga en vivo (cambios en tiempo real) |
| `dbaeumer.vscode-eslint` | Corrección y linting de JavaScript y TypeScript |
| `esbenp.prettier-vscode` | Formateo automático de código |
| `ecmel.vscode-html-css` | Autocompletado de CSS dentro de HTML |
| `Zignd.html-css-class-completion` | Autocompletado de clases CSS en HTML |
| `formulahendry.auto-rename-tag` | Renombra la etiqueta de apertura/cierre a la vez |
| `christian-kohler.path-intellisense` | Autocompletado de rutas de archivos |
| `christian-kohler.npm-intellisense` | Autocompletado de imports de paquetes npm |
| `xabikos.JavaScriptSnippets` | Snippets de JavaScript (ES6) |
| `formulahendry.code-runner` | Ejecutar código al vuelo |
| `wix.vscode-import-cost` | Muestra el tamaño de cada import |
| `eamodio.gitlens` | Integración con Git (blame, historial, etc.) |
| `vscode-icons-team.vscode-icons` | Iconos para los tipos de archivo |
| `yzhang.markdown-all-in-one` | Editar ficheros Markdown/README |

## Requisitos previos

- VS Code con la extensión **Dev Containers** (`ms-vscode-remote.remote-containers`).
- Podman instalado y con el socket de la API activo.

---

## Debian 13

### 1. Instalar Podman

```bash
sudo apt update
sudo apt install -y podman
podman --version
```

### 2. Activar el socket de la API (podman.socket)

VS Code necesita hablar con la API de Podman a través de un socket Unix.
Se activa con systemd a nivel de usuario:

```bash
systemctl --user enable --now podman.socket
loginctl enable-linger "$USER"
```

- `enable --now` arranca el socket ahora y lo deja activado en cada arranque.
- `enable-linger` mantiene los procesos de usuario (el socket) activos aunque
  cierres la sesión, necesario si tu equipo se reinicia o cierras sesión.

Comprueba que responde:

```bash
curl -H "Content-Type: application/json" \
  --unix-socket "$XDG_RUNTIME_DIR/podman/podman.sock" \
  http://localhost/_ping
```

Debe devolver `OK`.

### 3. Configurar VS Code para usar Podman

Abre los ajustes de usuario de VS Code
(`Ctrl+Shift+P` → *Preferences: Open User Settings (JSON)*,
que es `~/.config/Code/User/settings.json`) y añade:

```json
{
  "dev.containers.dockerPath": "podman",
  "dev.containers.dockerSocketPath": "/run/user/$UID/podman/podman.sock"
}
```

Sustituye `$UID` por tu id de usuario (`id -u`). La extensión Dev Containers
usará el binario `podman` y el socket de la API en vez del demonio de Docker.

Opcional, si quieres que las herramientas que usan la API de Docker (por
ejemplo `docker-compose`) también funcionen, añade a tu `~/.bashrc`:

```bash
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/podman/podman.sock
```

### 4. Abrir el proyecto en el contenedor

1. Abre la carpeta del proyecto en VS Code.
2. `Ctrl+Shift+P` → **Dev Containers: Reopen in Container**.
3. La primera vez construirá la imagen (tarda unos minutos); las siguientes serán rápidas.

---

## Windows 11 + WSL

La idea es usar Podman **dentro de WSL** (no en Windows), y VS Code conectarse
a WSL y desde ahí al contenedor.

### 1. Instalar WSL 2 con systemd

Asegúrate de tener WSL 2 y una distribución (por ejemplo Debian o Ubuntu):

```powershell
wsl --install -d Debian
wsl --set-version Debian 2
```

Habilita systemd dentro de la distribución. Edita `/etc/wsl.conf`:

```ini
[boot]
systemd=true
```

Reinicia WSL desde PowerShell:

```powershell
wsl --shutdown
```

Al volver a entrar, comprueba que systemd funciona:

```bash
systemctl is-system-running
```

### 2. Instalar y activar Podman dentro de WSL

Igual que en Debian, pero dentro de la terminal de WSL:

```bash
sudo apt update
sudo apt install -y podman
systemctl --user enable --now podman.socket
loginctl enable-linger "$USER"
```

Comprueba el socket:

```bash
curl -H "Content-Type: application/json" \
  --unix-socket "$XDG_RUNTIME_DIR/podman/podman.sock" \
  http://localhost/_ping
```

### 3. Configurar VS Code

Instala en VS Code las extensiones **WSL** (`ms-vscode-remote.remote-wsl`) y
**Dev Containers** (`ms-vscode-remote.remote-containers`).

Conecta a WSL: `Ctrl+Shift+P` → **WSL: Connect to WSL**.

Dentro de la sesión de WSL, abre los ajustes de usuario
(`Ctrl+Shift+P` → *Preferences: Open User Settings (JSON)`) y añade lo mismo
que en Debian:

```json
{
  "dev.containers.dockerPath": "podman",
  "dev.containers.dockerSocketPath": "/run/user/$UID/podman/podman.sock"
}
```

> Nota: los ajustes se guardan en el fichero `settings.json` **dentro de WSL**
> (`~/.config/Code/User/settings.json`), no en el de Windows.

### 4. Abrir el proyecto en el contenedor

1. Abre la carpeta del proyecto desde la sesión de WSL.
2. `Ctrl+Shift+P` → **Dev Containers: Reopen in Container**.

---

## Notas y solución de problemas

- **Puertos reenviados**: `5500` (Live Server), `3000` (servidores Node) y
  `5173` (Vite). VS Code los reenvía automáticamente a `localhost`.
- **Finales de línea**: el contenedor fuerza `files.eol: "\n"` para evitar
  problemas de CRLF al mezclar Windows y Linux.
- **Permisos**: el contenedor usa el usuario `node` (uid 1000). Si al montar la
  carpeta ves errores de permisos al crear ficheros, ejecuta desde el host:
  `sudo chown -R 1000:1000 .` (o tu uid con `id -u`).
- **El socket no responde**: revisa que `systemctl --user status podman.socket`
  esté `active (listening)` y que `loginctl show-user "$USER" -p Linger` diga `yes`.
- **Rebuild**: si cambias el `Containerfile` o el `devcontainer.json`, usa
  **Dev Containers: Rebuild Container**.