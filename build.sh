#!/usr/bin/env bash
find -iname '*.md' -exec cp {} $PWD/docs \;
export PAGEFIND_BUNDLE_DIR="_pagefind"
PAGEFIND_SOURCE="public" npx pagefind
npx pagefind --source docs --bundle-dir _pagefind
