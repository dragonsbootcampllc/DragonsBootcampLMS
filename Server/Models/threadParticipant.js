// Models/ThreadParticipant.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ThreadParticipant = sequelize.define('ThreadParticipant', {
    threadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'DiscussionThread',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'thread_participants',
    tableName: 'thread_participants',
});



module.exports = ThreadParticipant;
