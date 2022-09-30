module.exports = {
  "type": "postgres",
  "host": process.env.HOST,
  "port": parseInt(process.env.PORT),
  "username": process.env.USER,
  "password": process.env.PASSWORD,
  "database": process.env.DATABASE,
  "entities": ["./src/modules/**/typeorm/entities/*.ts"],
  "migrations": [
    "./src/shared/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/typeorm/migrations"
  }
}
