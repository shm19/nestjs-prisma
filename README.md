# NestJS Prisma Auth

This project is a boilerplate for a NestJS application using Prisma as an ORM and MySQL as the database. It includes authentication, user management, and basic CRUD operations with additional features like validation, interceptors, and error handling.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Documentation](#documentation)
- [Testing](#testing)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)

## Features

- Authentication (JWT)
- User management (CRUD)
- Prisma ORM with MySQL
- Validation pipes
- Response and timeout interceptors
- Error handling
- Swagger documentation

## Prerequisites

- Node.js (>=14.x)
- pnpm (Package manager)
- Docker and Docker Compose

## Setup

To set up the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/shm19/nestjs-prisma.git
   cd nestjs-prisma-auth
   ```

## Documentation

you can see a swagger doc by going to /api route

## Testing

you can run unit test by running

```bash
pnpm test
```

you can run e2e test by running

```bash
pnpm run test:e2e
```

you can also test manually using vscode REST CLIENT
by using api-tests.http with some sample data

## Environment Variables

Although this should not be in here but since this is not a real production project

```bash
DATABASE_URL="mysql://root:rootpassword@127.0.0.1:3306/nestjs_prisma"
MYSQL_DATABASE=nestjs_prisma
MYSQL_ROOT_PASSWORD=rootpassword
JWT_SECRET=your_secret_key

```
