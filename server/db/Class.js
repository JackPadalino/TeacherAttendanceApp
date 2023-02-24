const db = require("./db");
const Sequelize = require("sequelize");

const Class = db.define("class", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING
  },
  // will need to add identifier code eventually
  school:{
    type:Sequelize.ENUM,
    values:['MS','HS']
  },
  grade:{
    type:Sequelize.INTEGER,
    validate:{
      min:6,
      max:12
    }
  },
  period:{
    type:Sequelize.INTEGER,
    validate:{
      min:1,
      max:7
    },
    allowNull:false,
  },
  letterDays:{
    type:Sequelize.ARRAY(Sequelize.STRING),
    allowNull:false
  }
});

module.exports = Class;