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
      ),
        Spot.hasMany(
          models.Review, {
          foreignKey: 'spotId'
        }
        )

    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    address: {
      type: DataTypes.STRING,
      allowNull:false
    } ,
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: DataTypes.FLOAT(10,7),
    lng: DataTypes.FLOAT(10,7),
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        max: 50
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull:false
    }, 
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};