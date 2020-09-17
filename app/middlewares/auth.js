const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../utils/config');
const { Forbbiden } = require('../utils/error');

async function auth(ctx,next){
    try{
        jwt.verify(ctx.header.authorization, jwtConfig.secret);
        await next();
    }catch(e){
        let error = new Forbbiden();
        ctx.body = {
            code: error.code,
            message: error.message,
            data: {}
        }
    }
}

module.exports = {
    auth
}