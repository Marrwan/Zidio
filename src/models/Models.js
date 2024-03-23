const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");



const Location = sequelize.define("Location", {
  cityname: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
  note: {
    type: DataTypes.STRING,
  },
  countrycode: {
    type: DataTypes.STRING,
  },
  principality: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.JSON, // Using JSON for position to store latitude and longitude
  }
});


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
  forgotPasswordToken: {
    type: DataTypes.STRING,
  }

  
});

User.hasMany(Location, { as: 'locations', foreignKey: 'userId'}); // Establishing a one-to-many relationship
// Location.belongsTo(User, {through: "UserId"});

(async () => {
  try {
    await sequelize.sync();
    console.log('Models synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  } 
})();

module.exports = {User, Location}
