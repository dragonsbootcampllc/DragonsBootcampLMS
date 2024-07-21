const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class StreamingContent extends Model {}

StreamingContent.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  uploadedBy: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'StreamingContent',
  tableName: 'streaming_content',
});

module.exports = StreamingContent;
