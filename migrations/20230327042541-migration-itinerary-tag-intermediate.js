'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Create the ItineraryTag table
        await queryInterface.createTable('ItineraryTags', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            ItineraryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Itineraries',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            TagId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Tags',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });

        // Add foreign key constraints
        await queryInterface.addConstraint('ItineraryTags', {
            fields: ['ItineraryId'],
            type: 'foreign key',
            name: 'FK_ItineraryTag_ItineraryId',
            references: {
                table: 'Itineraries',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        await queryInterface.addConstraint('ItineraryTags', {
            fields: ['TagId'],
            type: 'foreign key',
            name: 'FK_ItineraryTag_TagId',
            references: {
                table: 'Tags',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    },

    async down(queryInterface, Sequelize) {
        // Remove foreign key constraints
        await queryInterface.removeConstraint('ItineraryTags', 'FK_ItineraryTag_ItineraryId');
        await queryInterface.removeConstraint('ItineraryTags', 'FK_ItineraryTag_TagId');

        // Drop the ItineraryTag table
        await queryInterface.dropTable('ItineraryTags');
    }
};
