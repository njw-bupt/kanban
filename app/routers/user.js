const Router = require('koa-router');
const { User } = require('../models');

const router = new Router();

router.post('/login', async ctx=>{
    let req = ctx.request.body;
    try{
        let res = await User.login(req.userName,req.password);
        ctx.body = {
            code: 200,
            message: 'ok',
            data: {
                token: res.token,
                userId: res.userId
            }
        };
    }catch(e){
        ctx.body = {
            code: e.code,
            message: e.message,
            data:{}
        }; 
    }   
})

router.post('/register', async (ctx,next)=>{
    try{
        let req = ctx.request.body;
        await User.register(req.userName,req.password);  
        ctx.body = {
            code: 200,
            message: 'ok',
            data: {
                userName: req.userName
            }
        }
    }catch(e){
        //throw e
        ctx.body = {
            code: e.code,
            message: e.message,
            data:{}
        };     
    }
})

router.get('/uniqueUsername', async ctx=>{
    let userName = ctx.query.userName;
    try{
        let unique = await User.uniqueUsernameCheck(userName);
        ctx.body = {
            code: 200,
            message: 'ok',
            data: unique
        }
    }catch(e){
        ctx.body = {
            code: e.code,
            message: e.message,
            data:{}
        };    
    }
})

router.get('/getUserNameById', async ctx=>{
    let userId = ctx.query.userId;
    try{
        let userName = await User.getUserNameById(userId);
        ctx.body = {
            code: 200,
            message: 'ok',
            data: userName
        }
    }catch(e){
        ctx.body = {
            code: e.code,
            message: e.message,
            data:{}
        };    
    }
})

module.exports = {
    user: router
}