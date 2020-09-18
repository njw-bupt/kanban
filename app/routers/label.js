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

router.post('/addLabel', async ctx=>{
    let labelInfo = ctx.request.body;
    try{
        let data = await Label.addLabel(labelInfo);
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

router.put('/editLabel', async ctx=>{
    let labelInfo = ctx.request.body;
    try{
        let data = await Label.editLabel(labelInfo);
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

router.delete('/deleteLabel', async ctx=>{
    let labelInfo = ctx.request.body;
    try{
        let data = await Label.deleteLabel(labelInfo);
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