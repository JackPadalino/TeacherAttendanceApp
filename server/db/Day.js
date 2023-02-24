const db = require("./db");
const Sequelize = require("sequelize");

const Day = db.define("day", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique:true
  },
  letterDay:{
    type:Sequelize.ENUM,
    values:['A','B','C','D','E','F'],
    allowNull:false
  },
});

module.exports = Day;