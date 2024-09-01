const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserLectureProgress extends Model {}

UserLectureProgress.init({
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
        field: 'user_id',
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
    progress: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        validate: {
            min: 0.0,
            max: 1.0,
        },
    },
    attended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    completionDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    courseId: { // Add this column
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
    modelName: 'UserLectureProgress',
    tableName: 'user_lecture_progress',
});

module.exports = UserLectureProgress;
