'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
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
   options.tableName='Reviews'
   return queryInterface.bulkInsert(options,[
    {
      //id:1,
      spotId:1,
      userId:1,
      review:'Very good spot',
      stars:4
    },
     {
     //  id: 2,
       spotId: 2,
       userId: 2,
       review: 'Very bad spot',
       stars: 1
     },
     {
      // id: 3,
       spotId: 3,
       userId: 3,
       review: 'I did not like so much',
       stars: 3
     },
     {
      // id: 4,
       spotId: 3,
       userId: 3,
       review: 'I did not like so much',
       stars: 4
     },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3,4] }
    }, {});
  }
};
