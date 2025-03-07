'use strict';

import { CHARACTERS } from '../../constants/tableNames.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(CHARACTERS, {
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
        status: {
          type: Sequelize.ENUM('Alive', 'Dead', 'unknown'),
          allowNull: false,
          defaultValue: 'unknown'
        },
        species: {
          type: Sequelize.STRING,
          allowNull: false
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false
        },        
        gender: {
          type: Sequelize.ENUM('Female', 'Male', 'Genderless', 'unknown'),
          allowNull: false,
          defaultValue: 'unknown'
        },
        origin: {
          type: Sequelize.INTEGER,
        },
        location: {
          type: Sequelize.INTEGER,
        },
        image: {
          type: Sequelize.JSONB
        },
        episode: {
          type: Sequelize.INTEGER
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
      await queryInterface.dropTable(CHARACTERS, { transaction });
      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err
    }
  }
};
