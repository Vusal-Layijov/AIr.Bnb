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
     {
       // id: 5,
       spotId: 1,
       userId: 2,
       review: 'Amazing location!',
       stars: 5
     },
     {
       // id: 6,
       spotId: 2,
       userId: 3,
       review: 'Disappointing',
       stars: 2
     },
     {
       // id: 7,
       spotId: 3,
       userId: 1,
       review: 'Beautiful views!',
       stars: 4
     },
     {
       // id: 8,
       spotId: 4,
       userId: 4,
       review: 'Great spot for a weekend getaway',
       stars: 4
     },
     {
       // id: 9,
       spotId: 5,
       userId: 1,
       review: 'Lovely cabin in the woods',
       stars: 5
     },
     {
       // id: 10,
       spotId: 5,
       userId: 3,
       review: 'Beautiful scenery, but the cabin needs some maintenance',
       stars: 3
     },
     {
       // id: 11,
       spotId: 6,
       userId: 2,
       review: 'Best vacation ever!',
       stars: 5
     },
     {
       // id: 12,
       spotId: 6,
       userId: 4,
       review: 'Decent place to stay, but a bit overpriced',
       stars: 3
     },
     {
       // id: 13,
       spotId: 4,
       userId: 2,
       review: 'The lake was amazing!',
       stars: 4
     },
     {
       // id: 14,
       spotId: 3,
       userId: 4,
       review: 'Not as good as I was hoping for',
       stars: 2
     },
     {
       // id: 15,
       spotId: 2,
       userId: 1,
       review: 'Nice spot, but needs some work',
       stars: 3
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15] }
    }, {});
  }
};
