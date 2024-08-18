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
        field: 'start_time',
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'end_time',
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
        allowNull: false,
        references: {
            model: 'courses',
            key: 'id',
        },
        field: 'course_id',
    },
}, {
    sequelize,
    modelName: 'Lecture',
    tableName: 'lectures',
    timestamps: true,
});

module.exports = Lecture;