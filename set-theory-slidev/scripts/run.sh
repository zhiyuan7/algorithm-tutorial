#!/usr/bin/env bash
set -euo pipefail

task="${1:-dev}"
case "$task" in
  dev|build|typecheck) ;;
  *) echo "usage: $0 [dev|build|typecheck]" >&2; exit 2 ;;
esac

pnpm run "$task"
