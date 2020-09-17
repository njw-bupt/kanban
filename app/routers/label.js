const Router = require('koa-router');
const { Label } = require('../models');

const router = new Router();

router.get('/allLabels', async ctx=>{
    let userId = ctx.query.userId;
    try{
        let data = await Label.getAllLabels(userId);
        ctx.body = {
            code: 200,
            message: 'ok',
            data
        };
    }catch(e){
        ctx.body = {
            code: e.code,
            message: e.message,
            data:[]
        }; 
    }   
})

module.exports = {
    label: router
}