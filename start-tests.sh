#!/bin/bash

mkdir -p test-results/e2e

yarn build
cp entrypoint.js build

LOG_LEVEL=debug ORIGIN=http://localhost:3000 API_URL=http://localhost:8055 ./build/entrypoint.js > test-results/e2e/server.log
