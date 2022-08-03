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
   await queryInterface.bulkInsert('Songs', [
    {
      userId: 1,
      albumId: 1,
      title: "Best Song Ever",
      description: 'Smash hit',
      url: 'www.goodsongs.com',
      imageUrl: "www.goodImage.com"
    },
    {
      userId: 2,
      albumId: 2,
      title: "Another Banger",
      description: 'on repeat',
      url: 'www.goodsongs.com',
      imageUrl: "www.goodImage.com"
    },
    {
      userId: 3,
      albumId: 3,
      title: "Party Anthem",
      description: 'fire song',
      url: 'www.goodsongs.com',
      imageUrl: "www.goodImage.com"
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
    await queryInterface.bulkDelete('Songs',
      {url: ['www.goodsongs.com']}
    )
  }
};
