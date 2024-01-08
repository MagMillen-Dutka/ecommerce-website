const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, // Ensure no null values passed
      primaryKey: true, 
      autoIncrement: true, // Increment the value for new records
    },
    tag_id: {
      type: DataTypes.INTEGER, 
      references: {
        model: "tag", // Link to the tag table
        key: "id", // Link to the 'id' column in the 'tag' table
      },
    },
    product_id: {
      type: DataTypes.INTEGER, // Set the data type to INTEGER
      references: {
        model: "product", // Link to the product table
        key: "id", // Link to the 'id' column in the 'product' table
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
