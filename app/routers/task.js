const Router = require('koa-router');
const { Task } = require('../models');
const { auth } = require('../middlewares/auth');

const router = new Router();

//添加路由权限保护
router.use(['/allTasks','/addNewTask','/deleteTask','/updateTask'], auth);


router.get('/allTasks', async ctx => {
    let userId = ctx.query.userId;
    let data = [];
    try{
        data = await Task.getAllTasks(userId);
        ctx.body = {
            code: 200,
            message: 'ok',
            data
        };
    }catch(e){
        ctx.body = {
            code: e.code,
            message: e.message,
            data
        }
    }
});

router.post('/addNewTask', async ctx =>{
    let newTask = ctx.request.body;
    let data = {};
    try{
        data = await Task.addNewTask(newTask);
        ctx.body = {
            code: 200,
            message: 'ok',
            data
        }
    }catch(e){
        ctx.body = {
            code: e.code,
            message: e.message,
            data
        }
    }
});

router.delete('/deleteTask', async ctx =>{
    let { userId, taskId } = ctx.request.body;
    try{
        await Task.deleteTask(userId, taskId);
        ctx.body = {
            code: 200
        }
    }catch(e){
        ctx.body = {
            code: e.code,
            message: e.message,
            data
        }
    }
});

//不要求所有字段都要传。只需taskId用于查找和需要更改的字段
router.put('/updateTask', async ctx => {
    let { userId, taskId, updateInfo } = ctx.request.body;
    try{
        await Task.updateTask(userId,taskId,updateInfo);
        ctx.body = {
            code: 200
        }
    }catch(e){
        ctx.body = {
            code: e.code,
            message: e.message,
            data
        }
    }
})

module.exports = {
    task: router
}