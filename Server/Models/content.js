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
    type: DataTypes.ENUM('link', 'file', 'text'),
    allowNull: false,
    field: 'content_type',
  },
  contentUrl: {
    type: DataTypes.STRING,
    field: 'content_url',
  },
  contentFile: {
    type: DataTypes.STRING,
    field: 'content_file',
  },
  contentText: {
    type: DataTypes.TEXT,
    field: 'content_text',
  },
  uploadedBy: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'uploaded_by',
  },
  lectureId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "lectures",
      key: "id",
    },
    field:"lecture_id"
  },
}, {
  sequelize,
  modelName: 'Content',
  tableName: 'content',
});

module.exports = Content;
