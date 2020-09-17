const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../utils/config');
const sequelize = require('../sequelize/sequelize');
const { LoginError, OperateError } = require('../utils/error');

//数据表结构定义
const attributes = {
    userName: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: 'userId'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}
const options = {
    tableName: 'Users',
    sequelize
}

//数据表操作定义
class User extends Model {
    //登录校验，成功时返回jwt令牌、userId，失败则抛出错误
    static async login(userName,curPW){
        let user = await this.findOne({
                where: {
                    userName
                }
            })
        if(!user){
            throw new LoginError('user not exist!');
        }
        let res = await bcrypt.compare(curPW, user.password);
        if(!res){
            throw new LoginError('wrong password!');
        }
        let payload = {
            userId: user.userId
        }
        let token = await jwt.sign(payload,jwtConfig.secret,jwtConfig.options);
        return {
            token,
            userId: user.userId
        }
    }

    //注册
    static async register(userName,password){
        let encryptPW = await bcrypt.hash(password,8);
        try{
            await this.create({
                userName,
                password: encryptPW
            })
        }catch(e){
            throw new OperateError('register fail!');
        }
    }

    //检查用户名是否唯一，返回boolean
    static async uniqueUsernameCheck(userName){
        try{
            let existNames = await this.findAll({
                attributes: ['userName']
            });
            return !existNames.some(user=>user.userName===userName);
        }catch(e){
            throw new OperateError('check username unique error');
        }
    }

    //根据用户id返回用户名
    static async getUserNameById(userId){
        try{
            let user = await this.findOne({
                where: {
                    userId
                }
            });
            return user.userName;
        }catch(e){
            throw new OperateError('find user error!');
        }
    }
    
};

User.init(attributes, options);

module.exports = User;