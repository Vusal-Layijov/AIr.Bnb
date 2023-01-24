'use strict';
const {
  Model,Validator
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
         Spot.belongsToMany(
        models.User,{
          through:'Booking',
          foreignKey:'spotId',
          otherKey:'userId'
        }
      )
      Spot.belongsToMany(
        models.User, {
        through: 'Review',
        foreignKey: 'spotId',
        otherKey: 'userId'
      }
      )
      Spot.belongsTo(
        models.User,{
          foreignKey:'ownerId'
        }
      )
      Spot.hasMany(
        models.SpotImage,{
          foreignKey:'spotId'
        }
      )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};