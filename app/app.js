const Koa = require('koa');
const parser = require('koa-bodyparser');
const models = require('./models');
const routers = require('./routers');
const cors = require('./utils/cors');

class Synchronizer{
    static app = new Koa()

    static initialize(){
        this.app.use(parser());
        this.app.use(cors); 
        this.app.listen(3000);
        this.initDB(models);
        this.initRouters(routers);
    }

    //数据库关联
    static async initDB(models){
        let modelNameArray = Object.keys(models);
        let promiseArray = modelNameArray.map(name => {
            return new Promise(function(){
                models[name].sync({alter:true});
            })
        });
        try{
            await Promise.all(promiseArray); 
        }catch(e){
            throw new Error('DB CONNECT ERROR!!!!!!!!');
        }
    }

    //路由挂载
    static async initRouters(routers){
        let routerName = Object.keys(routers);
        routerName.forEach(router => {
            this.app.use(routers[router].routes())
        });
    }
}

Synchronizer.initialize();