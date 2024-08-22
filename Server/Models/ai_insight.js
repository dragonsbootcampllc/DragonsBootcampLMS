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
    field: 'user_id',
  },
  insightType: {
    type: DataTypes.STRING,
    field: 'insight_type',
  },
  insightDetails: {
    type: DataTypes.JSONB,
    field: 'insight_details',
  },
}, {
  sequelize,
  modelName: 'AIInsight',
  tableName: 'ai_insights',
});

module.exports = AIInsight;
