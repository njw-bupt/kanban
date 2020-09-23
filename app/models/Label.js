const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize/sequelize');
const { DBError } = require('../utils/error');

//数据表结构定义
const attributes = {
    labelId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    labelName: {
        type: DataTypes.STRING,
    },
    labelColor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
    }
}
const options = {
    tableName: 'Labels',
    sequelize
}

class Label extends Model{
    //由于在表task里对label设置了默认值，因此数据库中需要有默认值对应的数据
    static async createDefault(){
        try{
            //检查是否存在，再create
            let defaultValue = await Label.findOne({
                where: {
                    labelName: 'default',
                    labelColor: '#27ae60'                  
                }
            })
            if(!defaultValue){
                await Label.create({
                    labelName: 'default',
                    labelColor: '#27ae60'
                })
            }
        }catch(e){
            //throw new DBError('DB ERROR: label table. create default value of label in db.');
            console.error('DB ERROR: label table. create default value of label in db');
        }
    }

    static async getAllLabels(userId){
        let data = [];
        try{
            data = await Label.findAll({
                where: {
                    userId
                }
            });
            let defaultLabel = await Label.findOne({
                where: {
                    labelName: 'default',
                    labelColor: '#27ae60'
                }
            });
            data.unshift(defaultLabel);
        }catch(e){
            throw new DBError('DB ERROR: label table. query all labels from db.');
        }
        return data;
    }

    static async addLabel(labelInfo){
        let data = {};
        try{
            data = await Label.create(labelInfo);
        }catch(e){
            throw new DBError('DB ERROR: label table. add new label to db.');
        }
        return data;
    }

    static async editLabel(labelInfo){
        let data = {};
        let updateInfo = {
            labelName: labelInfo.labelName,
            labelColor: labelInfo.labelColor
        }
        try{
            data = await Label.update(updateInfo,{
                where: {
                    labelId: labelInfo.labelId
                }
            });
        }catch(e){
            throw new DBError('DB ERROR: label table. edit label in db.');
        }
        return data;
    }

    static async deleteLabel(labelInfo){
        let data = {};
        let labelId = labelInfo.labelId;
        try{
            data = await Label.destroy({
                where: {
                    labelId
                }
            });
        }catch(e){
            throw new DBError('DB ERROR: label table. edit label in db.');
        }
        return data;
    }
}

Label.init(attributes,options);

Label.createDefault();

module.exports = Label;