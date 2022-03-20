#!/bin/sh

rm -rf dist/*
npm run webpack:build
# ./node_modules/typescript/bin/tsc --project tsconfig.build.json
cp package.json LICENSE README.md dist
./node_modules/typescript/bin/tsc --declaration --emitDeclarationOnly --outDir dist --skipLibCheck

# cd dist
# npm publish --dry-run