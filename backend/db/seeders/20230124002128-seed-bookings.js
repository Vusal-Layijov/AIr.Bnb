'use strict';
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName='Bookings'
   return queryInterface.bulkInsert(options,[
    {
      //id:1,
      spotId:1,
      userId:2,
      startDate:'2023-11-19',
      endDate:'2023-11-20'
    },
     {
       // id:2,      
       spotId: 2,
       userId: 1,
       startDate: '2023-06-07',
       endDate: '2023-06-08'
     },
     {
     // id:3,
       spotId: 3,
       userId: 1,
       startDate: '2023-07-03',
       endDate: '2023-07-04'
     }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3] }
    }, {});
  }
};
