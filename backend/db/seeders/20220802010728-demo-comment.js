'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Comments', [
      {
        userId: 3,
        songId: 1,
        body: 'this song slaps'
      },
      {
        userId: 2,
        songId: 2,
        body: 'this song is okay'
      },
      {
        userId: 1,
        songId: 1,
        body: 'this song rocks!!'
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Comments', {
      songId: [1, 2]
    })
  }
};
