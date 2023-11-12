#!/bin/bash

# create test results folder
mkdir -p test-results/e2e

# build image and run container if not running in container
if [ ! -f /.dockerenv ]; then
    # build container image
    docker build -t budgety .

    # run container
    docker compose up -d budgety
fi

# run playwright tests
LOG_LEVEL=debug ORIGIN=http://localhost:3000 yarn playwright test
EXIT_CODE=$?

# clean up and save log
if [ ! -f /.dockerenv ]; then
    # stop container
    docker compose stop budgety

    # save log file to test results folder
    docker logs budgety &> test-results/e2e/server.log
fi

exit $EXIT_CODE