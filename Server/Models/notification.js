const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Notification extends Model {}

Notification.init({
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
  },
  notificationType: {
    type: DataTypes.STRING,
  },
  notificationContent: {
    type: DataTypes.JSONB,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Notification',
  tableName: 'notifications',
});

module.exports = Notification;
