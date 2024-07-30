const {Model, DataTypes, json} = require('sequelize');
const sequelize = require('../config/database');

class Task extends Model {};

Task.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.ENUM('text', 'code', 'option'),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
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
        allowNull: false,
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    lectureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            modelName: 'lectures',
            key: 'id',
       },
    },
}, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks'
});

module.exports = Task;