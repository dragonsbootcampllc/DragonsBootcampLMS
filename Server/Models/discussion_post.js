const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DiscussionPost extends Model {}

DiscussionPost.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  threadId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'discussion_threads',
      key: 'id',
    },
    onDelete: 'CASCADE',
    field: 'thread_id',
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'user_id',
  },
  post: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'DiscussionPost',
  tableName: 'discussion_posts',
});

module.exports = DiscussionPost;
