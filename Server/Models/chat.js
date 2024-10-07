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
}, {
  sequelize,
  modelName: 'Chat',
  tableName: 'chats',
});

module.exports = Chat;
