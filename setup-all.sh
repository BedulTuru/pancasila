#!/bin/bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "[setup] Root: $ROOT_DIR"

LOG_DIR="$ROOT_DIR/logs"
mkdir -p "$LOG_DIR"

check_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: $1 is not installed." >&2
    exit 1
  fi
}
check_cmd node
check_cmd npm

echo "[setup] Installing dependencies..."
(cd "$ROOT_DIR/backend" && npm install)
(cd "$ROOT_DIR/frontend" && npm install)

echo "[setup] Building and starting servers..."

BACKEND_LOG="$LOG_DIR/backend.log"
FRONTEND_LOG="$LOG_DIR/frontend.log"

echo "[setup] Starting backend..."
(cd "$ROOT_DIR/backend" && npm run dev > "$BACKEND_LOG" 2>&1 & echo $! > "$LOG_DIR/backend.pid")
echo "[setup] Starting frontend..."
(cd "$ROOT_DIR/frontend" && npm run start > "$FRONTEND_LOG" 2>&1 & echo $! > "$LOG_DIR/frontend.pid")

echo "[setup] Started processes. Logs:"
echo "  Backend: $BACKEND_LOG (pid $(cat "$LOG_DIR/backend.pid"))"
echo "  Frontend: $FRONTEND_LOG (pid $(cat "$LOG_DIR/frontend.pid"))"
echo "Open http://localhost:5173/ and http://localhost:4000/"

echo "[setup] To stop, kill the PIDs saved in logs or run: kill $(cat $LOG_DIR/backend.pid) && kill $(cat $LOG_DIR/frontend.pid)"
exit 0
