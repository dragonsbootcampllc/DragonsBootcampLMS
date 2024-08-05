const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sequelize = require('../config/database');

class User extends Model {
  correctOTP(otp){
    // retrun the comparison of the two string otps
    return otp === this.otp;
  }
  createPasswordResetToken(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    return resetToken;
  }
  changedPasswordAfterTokenChanged(JWTTimeStamp) {
    if (this.passwordChangedAt) {
      const changedTimeStamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      return JWTTimeStamp < changedTimeStamp;
    }
  
    // FALSE MEANS NOT CHANGED
    return false;
  };
  async comparePassword(password){
    return await bcrypt.compare(password, this.password_hash);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  passwordChangedAt:{
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verified:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  otp_expiry_time: {
    type: DataTypes.DATE,
  },
  otp: {
    type: DataTypes.STRING,
  },
  passwordResetToken: {
    type: DataTypes.STRING,
  },
  passwordResetExpires:{
    type: DataTypes.DATE,
  },
}, {
  hooks:{
    beforeSave: async (user, options) => {
      console.log('Saving user');
      if (user.changed('password_hash')) {
        user.password_hash = await bcrypt.hash(user.password_hash,4);
      }
    }
  },
  sequelize,
  modelName: 'User',
  tableName: 'users'
});


module.exports = User;
