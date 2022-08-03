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
   await queryInterface.bulkInsert('Playlists', [
    {
      userId: 3,
      name: 'my love songs',
      imageUrl: 'www.goodImage.com'
    },
    {
      userId: 2,
      name: 'my breakup songs',
      imageUrl: 'www.goodImage.com'
    },
    {
      userId: 1,
      name: 'my rock songs',
      imageUrl: 'www.goodImage.com'
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
    await queryInterface.bulkDelete('Playlists', {
      imageUrl: ['www.goodImage.com']
    })
  }
};
