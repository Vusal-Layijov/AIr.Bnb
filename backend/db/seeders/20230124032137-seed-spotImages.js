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
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName='SpotImages'
   return queryInterface.bulkInsert(options,[
     {
       spotId: 1,
       url: 'https://wallpaperaccess.com/full/2315968.jpg',
       preview: true
     },
     {
       spotId: 2,
       url: 'https://www.architectureartdesigns.com/wp-content/uploads/2014/12/1357.jpg',
       preview: true
     },
     {
       spotId: 3,
       url: 'http://www.thewowstyle.com/wp-content/uploads/2015/01/architecture-design-houses.jpg',
       preview: true
     },
     {
       spotId: 4,
       url: 'https://2.bp.blogspot.com/-_RbYgKiba6E/T6qXnDNdh1I/AAAAAAAADM0/6jOJ-ecVgXQ/s1600/HDhut.blogspot.com+%252838%2529.jpg',
       preview: true
     },
     {
       spotId: 5,
       url: 'https://2.bp.blogspot.com/-iiCHLXdJMgo/T6qVE67340I/AAAAAAAADLM/KUZS5gNiMRE/s1600/HDhut.blogspot.com+%252826%2529.jpeg',
       preview: true
     },
     {
       spotId: 6,
       url: 'https://www.keralahouseplanner.com/wp-content/uploads/2012/04/awesome-house-elevation.jpg',
       preview: true
     },
     {
       spotId: 7,
       url: 'https://www.dreamystays.com/wp-content/uploads/2017/11/airbnb-kauai-princeville-budget.jpg',
       preview: true
     },
     {
       spotId: 8,
       url: 'https://www.dreamystays.com/wp-content/uploads/2020/11/5c64c430-ac84-4e82-9d52-3f5dd65f2fb2.jpg',
       preview: true
     },
     {
       spotId: 9,
       url: 'https://static3.therichestimages.com/wordpress/wp-content/uploads/2016/02/8f748cd7f497b64ee36d3ccd3df05a54-e1455829540909.jpg',
       preview: true
     },
   ])
  },

  async down (queryInterface, Sequelize) {
 
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3,4,5,6] }
    }, {});
  }
};
