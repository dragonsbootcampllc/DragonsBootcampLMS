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
        field: 'educator_id',
    },
    lecturesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        field: 'lectures_count',
    },
}, {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
    timestamps: true,

});

module.exports = Course;
