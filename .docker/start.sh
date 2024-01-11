#!/bin/bash

yarn

yarn build

yarn start:prod

tail -f /dev/null
