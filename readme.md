# HapiJS boilerplate

##library

- hapijs
- knexjs (query builder)
- jwt

## how to run

- clone this repo
- run `yarn` or `npm install`
- change all config in `.env`
- then run `yarn dev`

## Migration File

- to create migration file run command `knex migrate:make file_name_migration`
  and file migration was genereted in `./src/migrations`
- run `knex migrated:latest` for migrated all file migration;
