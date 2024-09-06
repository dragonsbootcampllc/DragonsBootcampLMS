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
    allowNull: true,
    field: 'message',
},
imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'image_url',
},
linkUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'link_url',
},
}, {
sequelize,
modelName: 'Chat',
tableName: 'chat',
});

module.exports = Chat;
