const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class BookResource extends Model {}

BookResource.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
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
<<<<<<< HEAD
    field:"uploaded_by"
=======
    fields: 'uploaded_by',
>>>>>>> origin/Sprent-2
  },
}, {
  sequelize,
  modelName: 'BookResource',
  tableName: 'book_resources',
});

module.exports = BookResource;
