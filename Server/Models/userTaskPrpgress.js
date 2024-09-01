const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/database')

class UserTaskProgress extends Model {}

UserTaskProgress.init({
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
   },
   taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "tasks",
        key: "id",
    }
   },
   userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "users",
        key: "id",
    }
   },
   is_finished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
   },
   answer: {
    type: DataTypes.TEXT,
},
    is_solve: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
   },
   completed_at: {
    type: DataTypes.DATE,
   },
}, {
    sequelize,
    modelName: "userTaskProgress",
    tableName: "user_task_progress",
})

module.exports = UserTaskProgress