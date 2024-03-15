// models/User.js
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
  location_visited: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Define it as an array of strings
    defaultValue: [] // Set a default empty array
  }
});

User.sync()
  .then(() => {
    console.log('User model synced successfully');
  })
  .catch(err => {
    console.error('Error syncing User model:', err);
  });

module.exports = User;
