const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserTaskProgress extends Model {}

UserTaskProgress.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        field: "user_id",
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tasks',
            key: 'id',
        },
    },
    finished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    completionDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'UserTaskProgress',
    tableName: 'user_task_progress',
});

module.exports = UserTaskProgress;
