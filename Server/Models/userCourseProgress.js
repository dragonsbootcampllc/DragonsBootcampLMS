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
        field: 'user_id',
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'courses',
            key: 'id',
        },
        fields: 'course_id',
    },
    completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'completed_at',
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_completed',
    },
}, {
    sequelize,
    modelName: 'UserCourseProgress',
    tableName: 'user_course_progress',
});

module.exports = UserCourseProgress;
