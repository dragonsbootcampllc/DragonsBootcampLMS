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
    field: 'user_id',
  },
  notificationType: {
    type: DataTypes.STRING,
    field: 'notification_type',
  },
  notificationContent: {
    type: DataTypes.JSONB,
    field: 'notification_content', 
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deliverd: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
  
}, {
  sequelize,
  modelName: 'Notification',
  tableName: 'notifications',
});

module.exports = Notification;
