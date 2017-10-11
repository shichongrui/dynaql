#!/bin/bash

docker-compose -f docker-compose.test.yml up -d

DYNAMO_ENDPOINT=http://dynamo.docker ./node_modules/.bin/jest "$@"

DYNAMO_ENDPOINT=http://dynamo.docker node ./test/teardown.js

docker-compose -f docker-compose.test.yml stop
