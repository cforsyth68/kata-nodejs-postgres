require("dotenv").config();
const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.POSTGRES_CON_STR, {
  logging: false,
});

module.exports = db;
