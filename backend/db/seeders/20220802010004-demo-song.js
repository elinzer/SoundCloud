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
    await queryInterface.bulkInsert('Songs', [
      {
        userId: 1,
        albumId: 1,
        title: "Toxic Love",
        description: 'A song about toxic love',
        url: "https://cdn.pixabay.com/download/audio/2022/08/19/audio_783a242e3a.mp3?filename=toxic-love-117607.mp3",
        imageUrl: "https://cdn.pixabay.com/audio/2022/08/19/15-28-11-391_200x200.png"
      },
      {
        userId: 2,
        albumId: 2,
        title: "Smooth Waters",
        description: 'A soothing song about smooth waters',
        url: "https://cdn.pixabay.com/download/audio/2022/07/30/audio_0fea22d728.mp3?filename=smooth-waters-115977.mp3",
        imageUrl: "https://cdn.pixabay.com/audio/2022/08/02/05-53-49-748_200x200.jpg"
      },
      {
        userId: 3,
        albumId: 3,
        title: "Inspiring Cinematic Ambient",
        description: "An inspiring cinematic ambient tune",
        url: "https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3?filename=inspiring-cinematic-ambient-116199.mp3",
        imageUrl: "https://cdn.pixabay.com/audio/2022/08/02/19-23-38-897_200x200.jpg"
      }

    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Songs',
      { url: ['www.goodsongs.com'] }
    )
  }
};
