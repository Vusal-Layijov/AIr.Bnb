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
    options.tableName ="Spots";
    return queryInterface.bulkInsert(options,[
      {
        ownerId:1,
        address: '1200 N mansfield',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 37.8900055,
        lng: 12.2134567,
        name: 'VIP Resort',
        description: 'Place where to chill',
        price: 123,
      },
      {
        ownerId: 2,
        address: '2200 N mansfield',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 40.8900055,
        lng: 32.2134567,
        name: 'VIP Address',
        description: 'Place where to relax',
        price: 203,
      },
      {
        ownerId: 3,
        address: '3200 N mansfield',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 57.8900055,
        lng: 72.2134567,
        name: 'VIP Woda',
        description: 'Place where to swim',
        price: 99,
      }
    ],{})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
