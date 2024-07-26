const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserPreference extends Model {}

UserPreference.init({
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false,
  },
  theme: {
    type: DataTypes.STRING,
    defaultValue: 'light',
  },
  notification: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  language: {
    type: DataTypes.STRING,
    defaultValue: 'en', 
  },
}, {
  sequelize,
  modelName: 'UserPreference',
  tableName: 'user_preferences',
});

module.exports = UserPreference;
