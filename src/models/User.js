// models/Book.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  full_name: {
    type: DataTypes.STRING,
    unique: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  location_visited : [{
    type : DataTypes.STRING,

  }]
});

User.sync().then(() => {
    console.log("User Model synced");
  }); 

module.exports = User;
