const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Tag extends Model {}

Tag.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags',
    timestamps: true,
})

module.exports = Tag;