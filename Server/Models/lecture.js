const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const { lectureTypes } = require('../config/options');

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
        type: DataTypes.ENUM(...lectureTypes),
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
    },
    recordedLink: {
        type: DataTypes.STRING,
        field: 'recorded_link',
    },
    online_link:{
        type: DataTypes.STRING,
    },
    order: {
        type: DataTypes.INTEGER,
    },
    estimated_time:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
