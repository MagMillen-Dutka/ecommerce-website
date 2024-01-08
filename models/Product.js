// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, // Ensure no null values passed
      primaryKey: true,
      autoIncrement: true, // Increment the value for new records
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure no null values passed
    },
    price: {
      type: DataTypes.DECIMAL, // Make the data type to DECIMAL so you can add pence - £3.99 as example.
      allowNull: false, // Ensure no null values passed
      validate: {
        isDecimal: true, // check for decimal number
      },
    },
    stock: {
      type: DataTypes.INTEGER, 
      allowNull: false, // Disallow NULL values
      defaultValue: 10, // Set the default value to 10
      validate: {
        isNumeric: true, // check it's a numeric value and not letters
      },
    },
    category_id: {
      type: DataTypes.INTEGER, 
      references: {
        model: "category", // Link to the 'category.js' table
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
