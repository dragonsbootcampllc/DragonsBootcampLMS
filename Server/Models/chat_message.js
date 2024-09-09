const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ChatMessage extends Model {}

ChatMessage.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  chatId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'chats',
      key: 'id',
    },
    field: 'chat_id',
  },
}, {
  sequelize,
  modelName: 'ChatMessage',
  tableName: 'chat_messages',
});

module.exports = ChatMessage;