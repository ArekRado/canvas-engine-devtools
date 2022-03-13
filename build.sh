#!/bin/sh

rm -rf dist/*
# npm run build
# ./node_modules/typescript/bin/tsc --project tsconfig.build.json
# cp package.json LICENSE README.md dist

npx -p typescript tsc --declaration --emitDeclarationOnly --outDir types

# cd dist
# npm publish --dry-run