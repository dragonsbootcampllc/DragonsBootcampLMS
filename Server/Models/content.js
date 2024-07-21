const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Content extends Model {}

Content.init({
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
  contentType: {
    type: DataTypes.STRING,
  },
  contentUrl: {
    type: DataTypes.TEXT,
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
  modelName: 'Content',
  tableName: 'content',
});

module.exports = Content;
