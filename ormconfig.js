module.exports = {
  "type": "postgres",
  "host": process.env.HOST,
  "port": parseInt(process.env.PORT),
  "username": process.env.USER,
  "password": process.env.PASSWORD,
  "database": process.env.DATABASE
}
