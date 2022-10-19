#!/bin/sh

cd ../canvas-engine
echo "Building canvas-engine"
sh build.sh
cd ../canvas-engine-devtools

echo "Copying canvas-engine to canvas-engine-devtools"
rm -rf ./node_modules/@arekrado/canvas-engine 
mkdir ./node_modules/@arekrado/canvas-engine 
cp -R ../canvas-engine/dist/* ./node_modules/@arekrado/canvas-engine