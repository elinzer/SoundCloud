'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Playlist.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Playlist.hasMany(models.PlaylistSong, { foreignKey: 'playlistId' })
      Playlist.belongsToMany(models.Song, {
        foreignKey: 'playlistId',
        through: models.PlaylistSong,
        otherKey: 'songId'
      })
    }
  }
  Playlist.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
