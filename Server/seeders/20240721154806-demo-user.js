'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'john_doe',
        email: 'john.doe@example.com',
        password_hash: 'hashed_password',
        role: 'user',
        verified:true,
        createdat: new Date(),
        updatedat: new Date(),
      },
      {
        username: 'jane_doe',
        email: 'jane.doe@example.com',
        password_hash: 'hashed_password',
        role: 'admin',
        verified:true,
        createdat: new Date(),
        updatedat: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      username: {
        [Sequelize.Op.in]: ['john_doe', 'jane_doe'] // Adjust this array as needed
      }
    }, {});
  }
};
