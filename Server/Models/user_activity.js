const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserActivity extends Model {}

UserActivity.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  activityType: {
    type: DataTypes.STRING,
  },
  activityDetails: {
    type: DataTypes.JSONB,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'UserActivity',
  tableName: 'user_activities',
});

module.exports = UserActivity;
