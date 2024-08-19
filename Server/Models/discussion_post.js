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
<<<<<<< HEAD
    field: 'thread_id',
=======
    fields: 'thread_id',
>>>>>>> origin/Sprent-2
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
<<<<<<< HEAD
    field: 'user_id',
=======
    fields: 'user_id',
>>>>>>> origin/Sprent-2
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
