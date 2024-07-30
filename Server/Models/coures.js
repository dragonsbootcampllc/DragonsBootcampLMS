const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Course extends Model {}

Course.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    educatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    lecturesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Course',
    tableName: 'courses'
});

module.exports = Course;

