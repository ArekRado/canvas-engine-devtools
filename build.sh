#!/bin/sh

rm -rf dist/*
./node_modules/typescript/bin/tsc --declaration --emitDeclarationOnly --outDir dist --skipLibCheck
npm run build
# ./node_modules/typescript/bin/tsc --project tsconfig.build.json
cp package.json LICENSE README.md dist

# cd dist
# npm publish --dry-run