const { Sequelize } = require("sequelize");

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASENAME,
});