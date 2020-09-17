const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize/sequelize');
const { OperateError } = require('../utils/error');

//数据表结构定义
const attributes = {
    taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taskDescription: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    taskStatus: {
        type: DataTypes.STRING,
        defaultValue: 'todo'
    },
    labelName: {
        type: DataTypes.STRING,
        defaultValue: 'default'
    },
    labelColor: {
        type: DataTypes.STRING,
        defaultValue: '#27ae60'
    }
}
const options = {
    tableName: 'Tasks',
    sequelize
}

//数据表操作定义
class Task extends Model {
    //所有用户公用一张表，用userId字段区分
    //拉取所有tasks
    static async getAllTasks(userId){
        let data = {};
        try{
            data = await Task.findAll({
                where: {
                    userId
                }
            })
        }catch(e){
            throw new OperateError('GET TASKS FAIL!!')
        }
        return data;
    }
        
    static async addNewTask(newTask){
        let data = {};
        try{
            data = await Task.create(newTask);
        }catch(e){
            throw new OperateError('ADD TASK FAIL!!');
        }
        return data;
    }
    
    static async deleteTask(userId, taskId){
        let data = {};
        try{
            data = await Task.destroy({
                where: {
                    userId,
                    taskId
                }
            });
        }catch(e){
            throw new OperateError('DELETE TASK FAIL!!');
        }
        return data;
    }
    
    static async updateTask(userId, taskId, updateInfo){
        let data = {};
        try{
            data = await Task.update(updateInfo,{
                where: {
                    userId,
                    taskId
                }
            });
        }catch(e){
            throw new OperateError('UPDATE TASK FAIL!!');
        }
        return data;
    }
};

Task.init(attributes,options);

module.exports = Task;