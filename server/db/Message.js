const db = require("./db");
const Sequelize = require("sequelize");

const Message = db.define("message", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  content: {
    type: Sequelize.STRING
  }
});

module.exports = Message;