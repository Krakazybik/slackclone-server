<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


## Описание
Сервер чата с использование `Socket.IO` и БД `PostgreSQL`.
Для запуска необходимы файлы окружения `.development.env` - для `start:dev`, `.production.env` - для `build`.
Swagger сервер с API запускается по адрессу:
[API](http://localhost:5000/api/docs)
#### Пример:
```SERVER_PORT=5000
POSTGRES_HOST=localhost
POSTGRES_DB=slackclone
POSTGRES_USER=postgres
POSTGRES_PASSWORD=
POSTGRES_PORT=5432
JWT_SECRET=muhahaSecretJwT
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
`Все любят котиков. NestJS - тоже.` 
