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
        price: 123.98
      },
      {
        ownerId: 1,
        address: '2200 N mansfield',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 40.8900055,
        lng: 32.2134567,
        name: 'VIP Address',
        description: 'Place where to relax',
        price: 100.00 ,
      },
      {
        ownerId: 2,
        address: '3200 N mansfield',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 57.8900055,
        lng: 72.2134567,
        name: 'VIP Woda',
        description: 'Place where to swim',
        price: 187.45 ,
      },
      {
        ownerId: 3,
        address: '4500 N field',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        lat: 45.8900055,
        lng: 82.2134567,
        name: 'Dag Resort',
        description: 'Mountain side. Lake front great home ',
        price: 149 ,
      },
      {
        ownerId: 2,
        address: '4500 Calamari st',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        lat: 25.8900055,
        lng: 92.2134567,
        name: 'King of Jungle',
        description: 'Your dream home in mountain',
        price: 129.50 ,
      },
      {
        ownerId: 1,
        address: '1200 Proxy st',
        city: 'Seatle',
        state: 'WA',
        country: 'USA',
        lat: 12.8900055,
        lng: 42.2134567,
        name: 'Sarah',
        description: 'Best of the best.',
        price: 109.50 ,
      },
      {
        ownerId: 3,
        address: '5500 E River Rd',
        city: 'Tucson',
        state: 'AZ',
        country: 'USA',
        lat: 32.2568,
        lng: -110.8200,
        name: 'Sonoran Desert Oasis',
        description: 'Experience the beauty of the Sonoran Desert in style.',
        price: 200.00,
      },
      {
        ownerId: 2,
        address: '2000 Sunset Blvd',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.0974,
        lng: -118.3295,
        name: 'Hollywood Hills Mansion',
        description: 'Live like a movie star in this luxurious mansion.',
        price: 500.00,
      },
      {
        ownerId: 1,
        address: '300 Newbury St',
        city: 'Boston',
        state: 'MA',
        country: 'USA',
        lat: 42.3486,
        lng: -71.0892,
        name: 'Chic Urban Loft',
        description: 'Experience the best of Boston in this stylish loft.',
        price: 150.00,
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
      id: { [Op.in]: [1,2,3,4,5,6,7,8,9] }
    }, {});
  }
};
