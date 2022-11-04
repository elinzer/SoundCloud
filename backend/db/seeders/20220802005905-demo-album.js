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
      title: 'Still King',
      description: 'These beats are still king',
      imageUrl: 'https://www.mixtapepsds.com/wp-content/uploads/2019/04/Mixtape-Template-Still-King.png'
    },
    {
      userId: 2,
      title: 'Spaceman',
      description: 'Get lost in space with some out of this world music',
      imageUrl: 'https://e.snmc.io/i/600/s/ad358322e81f2c5456a03cfcf7965f1b/9163322/free-the-kids-falling-into-reality-cover-art.jpg'
    },
    {
      userId: 3,
      title: 'REBIRTH',
      description: 'A really intense album by this artist',
      imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7cb559133274417.61b9ed14088e1.jpg'
    },
    {
      userId: 4,
      title: "Baby's 1st Album",
      description: 'A stunning debut album by this artist',
      imageUrl: 'https://cdn.pixabay.com/photo/2021/06/06/21/20/album-cover-6316344_960_720.jpg'
    },
    {
      userId: 3,
      title: 'Dog Days',
      description: 'This artist can really make you feel like you are in the dog days',
      imageUrl: 'https://wallpaper.dog/large/20458355.jpg'
    },
    {
      userId: 2,
      title: 'Thinking',
      description: 'A work of art. A masterpiece.',
      imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3fc12694456069.5e7f51e8ade82.jpg'
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
    await queryInterface.bulkDelete('Albums',
      {
        imageUrl: ['www.goodImages.com']
      }
    )
  }
};
