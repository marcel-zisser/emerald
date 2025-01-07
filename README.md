# Emerald 

<img src="libs/shared/assets/emerald.svg" width="50">

## Requirements

- Node 22.12.0 (Current LTS)
- Docker

## Environment Configuration

For the application to work, you need to create a file called '.env' in the root directory.
The following variables MUST be defined:
- DATABASE_URL 
  - The API will use this URL to connect to the database.
  - The URL should be formatted according to Prisma specifications.
  - https://www.prisma.io/docs/orm/reference/connection-urls
- JWT_SECRET
  - This serves as your JWT encryption key.
  - Make sure this key is long enough and not guessable. (using something like 'secret' is not a good idea)



## Development Setup
To have a good development experience use the docker-compose file to set up a temporary database:
```sh
docker compose up
```

### Run tasks

Now we need to start the development-servers for both API and UI project: 
```sh
npx nx serve emerald-ui
```
```sh
npx nx serve emerald-api
```
Alternatively, you can use the npm script to start both with just one command:
```sh
npm run start:emerald
```

### Development Database
A pre-build script for the API will populate the database with some sample data.
There will be 3 users for development out of the box:
- admin
  - pw: admin
- project-owner
  - pw: admin
- reviewer
  - pw: admin

### Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
