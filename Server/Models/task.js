const {Model, DataTypes, json} = require('sequelize');
const sequelize = require('../config/database');
const { taskTypes } = require('../config/options');

class Task extends Model {};

Task.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.ENUM(...taskTypes),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
    },
    testcases: {
        type: DataTypes.JSON,
    },
    options: {
        type: DataTypes.JSON,
    },
    answer: {
        type: DataTypes.TEXT,
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
    lectureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'lectures',
            key: 'id',
       },
       field: 'lecture_id',
    },
}, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
});

module.exports = Task;
