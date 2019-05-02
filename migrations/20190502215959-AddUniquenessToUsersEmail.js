'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users',
      'email'
    );
  }
};
