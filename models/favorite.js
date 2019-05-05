'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    location: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User)
  };
  return Favorite;
};
