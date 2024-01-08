const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, // Ensure no null values passed
      primaryKey: true, 
      autoIncrement: true, // Increment the value for new records
    },
    // Define the 'category_name' column
    category_name: {
      type: DataTypes.STRING, // Set the data type to STRING
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
