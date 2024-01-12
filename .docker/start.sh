#!/bin/bash

yarn

npx prisma migrate deploy

npx prisma generate

yarn build

yarn start:prod

tail -f /dev/null
