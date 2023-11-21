'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('NilaiMapel', 'isi_nilai', {
      type: Sequelize.FLOAT.UNSIGNED,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('NilaiMapel', 'isi_nilai', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false
    });
  }
};
