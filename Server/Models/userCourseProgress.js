const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserCourseProgress extends Model {}

UserCourseProgress.init({
    id: {
        type: DataTypes.INTEGER,
        // defaultValue: DataTypes.UUIDV4,
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
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'courses',
            key: 'id',
        },
    },
    startedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        },
}, {
    sequelize,
    modelName: 'UserCourseProgress',
    tableName: 'user_course_progress',
});

module.exports = UserCourseProgress;
