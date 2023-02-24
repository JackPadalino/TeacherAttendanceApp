const db = require("./db");
const Sequelize = require("sequelize");

const Coverage = db.define("coverage", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
});

module.exports = Coverage;