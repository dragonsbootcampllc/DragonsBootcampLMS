const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Lecture extends Model {};

Lecture.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('text', 'recorded', 'online'),
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
    },
    recordedLink: {
        type: DataTypes.STRING,
    },
    order: {
        type: DataTypes.INTEGER,
    },
    courseId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'courses',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Lecture',
    tableName: 'lectures',
});

module.exports = Lecture;