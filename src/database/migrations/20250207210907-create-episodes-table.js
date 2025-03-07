'use strict';

import { EPISODES } from '../../constants/tableNames.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(EPISODES, {
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
        air_date: {
          type: Sequelize.STRING,
          allowNull: false
        },
        episode: {
          type: Sequelize.STRING,
          allowNull: false
        },
        characters: {
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
      await queryInterface.dropTable(EPISODES, { transaction });
      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err
    }
  }
};
