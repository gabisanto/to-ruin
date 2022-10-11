const Sequelize = require("sequelize");
const db = new Sequelize("moviehouse", "ubuntu", "password123", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
