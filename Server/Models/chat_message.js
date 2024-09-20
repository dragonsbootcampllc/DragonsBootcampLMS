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
  senderId: {
    type: DataTypes.INTEGER,
    references: {
    model: 'users',
    key: 'id',
    allowNull: false,
    },
    field: 'sender_id',
},
receiverId: {
    type: DataTypes.INTEGER,
    references: {
    model: 'users',
    key: 'id',
    allowNull: false,
    },
    field: 'receiver_id',
},
chatId: {
  type: DataTypes.INTEGER,
  references: {
    model: 'chats',
    key: 'id',
  },
  field: 'chat_id',
},
status: {
  type: DataTypes.ENUM("read", "deliverd", "pending"),
  defaultValue: "deliverd"
},
}, {
  sequelize,
  modelName: 'ChatMessage',
  tableName: 'chat_messages',
});

module.exports = ChatMessage;