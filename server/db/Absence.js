const db = require("./db");
const Sequelize = require("sequelize");

const Absence = db.define("absence", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
  },
});

module.exports = Absence;