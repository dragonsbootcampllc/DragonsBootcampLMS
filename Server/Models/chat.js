const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Chat extends Model {}

Chat.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  chatId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'chat_id',
  },

}, {
  sequelize,
  modelName: 'Chat',
  tableName: 'chats',
});

module.exports = Chat;
