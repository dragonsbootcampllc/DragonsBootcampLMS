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
    field: 'user_id',
  },
  activityType: {
    type: DataTypes.STRING,
    field: 'activity_type',
  },
  activityDetails: {
    type: DataTypes.JSONB,
    field: 'activity_details',
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
