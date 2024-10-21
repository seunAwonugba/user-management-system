# Role Management Syatem - README

## Description

You will create a user and role management system where users are assigned roles,
and API access is controlled based on those roles.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/)

## Local Development Setup

### Step 1: Clone the repository

```bash
  git clone https://github.com/seunAwonugba/user-management-system.git
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Setup environment variables

```bash
DATABASE_URL=
SALT_ROUNDS=
ACCESS_TOKEN_KEY=
REFRESH_TOKEN_KEY=
ACCESS_TOKEN_KEY_EX=
REFRESH_TOKEN_KEY_EX=
```

add env values with your desired values.

## Running the app

```bash
npm run start
```

## Running Test Files

```bash
npm run test user.controller.spec.ts
npm run test user.controller.spec.ts
```
