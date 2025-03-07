'use strict';

import { LOCATIONS } from '../../constants/tableNames.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(LOCATIONS, {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        type: {
          type: Sequelize.STRING
        },        
        dimension: {
          type: Sequelize.STRING
        },
        residents: {
          type: Sequelize.INTEGER
        },
        url: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction });
      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable(LOCATIONS, { transaction });
      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err
    }
  }
};
