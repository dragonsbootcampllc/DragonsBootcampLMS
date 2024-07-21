const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class AIInsight extends Model {}

AIInsight.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  insightType: {
    type: DataTypes.STRING,
  },
  insightDetails: {
    type: DataTypes.JSONB,
  },
  generatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'AIInsight',
  tableName: 'ai_insights',
});

module.exports = AIInsight;
