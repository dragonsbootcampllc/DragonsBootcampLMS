const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ChatMessage extends Model {}

ChatMessage.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'sender_id',
  },
  receiverId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'receiver_id',
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'ChatMessage',
  tableName: 'chat_messages',
});

module.exports = ChatMessage;
