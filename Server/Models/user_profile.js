const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserProfile extends Model {}

UserProfile.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  profilePicture: {
    type: DataTypes.BLOB,
  },
}, {
  sequelize,
  modelName: 'UserProfile',
  tableName: 'user_profiles',
});

module.exports = UserProfile;
