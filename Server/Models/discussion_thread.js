const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DiscussionThread extends Model {}

DiscussionThread.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'created_by',
  },
  linkedToId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  linkedToType: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  sequelize,
  modelName: 'DiscussionThread',
  tableName: 'discussion_threads',
});

module.exports = DiscussionThread;
