#!/bin/bash
set -e

# If DISPLAY is not set, run with a virtual framebuffer (Xvfb)
if [ -z "$DISPLAY" ]; then
  echo "[AvatarSync Docker] No DISPLAY environment variable detected. Starting virtual display with Xvfb..."
  exec xvfb-run -a -s "-screen 0 1920x1080x24" npx electron . --no-sandbox "$@"
else
  echo "[AvatarSync Docker] DISPLAY is set to '$DISPLAY'. Launching Electron..."
  exec npx electron . --no-sandbox "$@"
fi
