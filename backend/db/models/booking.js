'use strict';
const {
  Model,Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.User,{
          foreignKey:'userId'
        }
      )
      Booking.belongsTo(
        models.Spot, {
        foreignKey: 'spotId'
      }
      )
    }
  }
  Booking.init({
    spotId:{
      type: DataTypes.INTEGER,
      allowNull:false
    } ,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};