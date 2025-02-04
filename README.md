# Emerald 

<img src="libs/shared/assets/emerald.svg" width="50">

## Requirements

- Node 22.12.0 (Current LTS)
- Docker

## Environment Configuration

For the application to work, you need to create a file called `.env` in the root directory.
The following variables MUST be defined:
- DATABASE_URL 
  - The API will use this URL to connect to the database.
  - The URL should be formatted according to Prisma specifications.
  - https://www.prisma.io/docs/orm/reference/connection-urls
- JWT_SECRET
  - This serves as your JWT encryption key.
  - Make sure this key is long enough and not guessable. (using something like 'secret' is not a good idea)
- PRODUCTION
  - Determines if we use SSL/TLS for the database connection.
  - Only important if the demo data should be loaded

In case you want to use the provided Docker file for just trying it out, the following variables must be defined as well:
- POSTGRES_USER
  - This is the username for the Postgres Database
- POSTGRES_PASSWORD
  - The password for the user defined above
- POSTGRES_DB
  - The name of the database

**Important**

If another database provider than Postgres is used, this needs to be changed in the `schema.prisma`, which can be found in `apps/emerald-api/prisma`.
Change the `provider` property of the `datasource` object to the appropriate provider.

A sample `.env` file for the provided development setup could look like this:
``` dotenv
# Database provider:  postgresql
# Database user:      iaweb
# Database passowrd:  iaweb123!
# Database host:      localhost
# Database port:      5432
# Databse name:       emerald
# Schema:             public
DATABASE_URL=postgresql://iaweb:iaweb123!@localhost:5432/emerald?schema=public

POSTGRES_HOST=localhost
POSTGRES_USER=iaweb
POSTGRES_PASSWORD=iaweb123!
POSTGRES_DB=emerald

PRODUCTION=false

JWT_SECRET=5f5695668f956d0268a4248b8d1770a64259cf64e128c67bccaa62879b29487d
```


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

## Deployment
To deploy Emerald to a server use the following commands in the root directory of the repository.
```sh
npm install
```
```sh
npm build:production
```

After these two commands, you can find the built project in the `dist` folder on the root level of the repository.
To launch Emerald, simply start the Node.js server using:
```sh
node ./dist/apps/emerald-api/main.js
```

Optionally, demo data can be generated in the database. This wipes the database clean, so be careful and use backups before doing that.
```sh
npm generate-demo-data
```



### Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
