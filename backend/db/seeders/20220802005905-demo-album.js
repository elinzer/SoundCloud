'use strict';

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
   await queryInterface.bulkInsert('Albums', [
    {
      userId: 1,
      title: 'First Album',
      description: 'Debut Album',
      imgUrl: 'www.goodImages.com'
    },
    {
      userId: 2,
      title: '2nd Album',
      description: 'Soph Album',
      imgUrl: 'www.goodImages.com'
    },
    {
      userId: 3,
      title: '3rd Album',
      description: 'Trilogy Album',
      imgUrl: 'www.goodImages.com'
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
    await queryInterface.bulkDelete('Albums', [
      {
        imgUrl: ['www.goodImages.com']
      }
    ])
  }
};
