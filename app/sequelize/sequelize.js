const { Sequelize } = require('sequelize');
const { dbConfig } = require('../utils/config');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.details);

module.exports = sequelize;

//测试数据连接，测试完毕后断开连接
// testSQLConnection().finally(()=>{
//     sequelize.close()
// });

//数据库连接测试函数
// async function testSQLConnection(){
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }