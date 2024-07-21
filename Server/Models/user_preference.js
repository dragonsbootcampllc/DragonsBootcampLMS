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
  },
  preferenceKey: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  preferenceValue: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize,
  modelName: 'UserPreference',
  tableName: 'user_preferences',
});

module.exports = UserPreference;
