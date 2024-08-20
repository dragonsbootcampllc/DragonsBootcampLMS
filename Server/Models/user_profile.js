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
    field: 'userid',
  },
  firstName: {
    type: DataTypes.STRING,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name',
  },
  bio: {
    type: DataTypes.TEXT,
  },
  profilePicture: {
    type: DataTypes.BLOB,
    field: 'profile_picture',
  },
}, {
  sequelize,
  modelName: 'UserProfile',
  tableName: 'user_profiles',
});

module.exports = UserProfile;
