#!/bin/bash
set -e

cd "$(dirname "$0")"

BRANCH="$(git branch --show-current)"
if [ -z "$BRANCH" ]; then
  BRANCH="concept/cosmos-catalog"
fi

echo "SREZ preview"
echo "Branch: $BRANCH"

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Pulling latest changes..."
  git pull --ff-only origin "$BRANCH" || true
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install --no-audit --no-fund
fi

cleanup() {
  echo "Stopping SREZ preview..."
  kill "$VITE_PID" "$STORYBOOK_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "Starting app on http://localhost:5173"
npm run dev -- --host 127.0.0.1 > /tmp/srez-vite.log 2>&1 &
VITE_PID=$!

echo "Starting Storybook on http://localhost:6006"
npm run storybook -- --host 127.0.0.1 > /tmp/srez-storybook.log 2>&1 &
STORYBOOK_PID=$!

for i in {1..60}; do
  APP_READY=0
  SB_READY=0
  curl -fsS http://127.0.0.1:5173 >/dev/null 2>&1 && APP_READY=1 || true
  curl -fsS http://127.0.0.1:6006 >/dev/null 2>&1 && SB_READY=1 || true
  if [ "$APP_READY" -eq 1 ] && [ "$SB_READY" -eq 1 ]; then
    break
  fi
  sleep 1
done

open http://localhost:5173
open http://localhost:6006

echo ""
echo "SREZ is running:"
echo "  App:       http://localhost:5173"
echo "  Storybook: http://localhost:6006"
echo ""
echo "Leave this window open while you review."
echo "Press Ctrl+C to stop both servers."

wait
