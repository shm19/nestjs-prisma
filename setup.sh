#!/bin/bash

set -e

echo "Step 1: Installing dependencies using pnpm..."
pnpm install

echo "Step 2: Running Prisma migrations..."
npx prisma migrate dev --name init

echo "Step 3: Generating Prisma client..."
npx prisma generate

echo "Step 4: Bringing up Docker Compose..."
docker-compose up -d

echo "Step 5: Starting the NestJS application..."
pnpm run start:dev

echo "All steps completed successfully!"
