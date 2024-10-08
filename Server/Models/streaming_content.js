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
    field: 'uploaded_by',
  },
  lectureId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        modelName: 'lectures',
        key: 'id',
   },
    field: 'lecture_id',
  },
}, {
  sequelize,
  modelName: 'StreamingContent',
  tableName: 'streaming_content',
});

module.exports = StreamingContent;
