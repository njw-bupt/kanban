class LoginError extends Error{
    constructor(message, code){
        super();
        this.code = code || 401;
        this.message = message || 'login error!';
    }
}

class OperateError extends Error{
    constructor(message, code){
        super();
        this.code = code || 500;
        this.message = message || 'operate fail!';
    }
}

class Forbbiden extends Error{
    constructor(message, code){
        super();
        this.code = code || 403;
        this.message = message || 'no authority';
    }
}

class DBError extends Error{
    constructor(message, code){
        super();
        this.code = code || 500;
        this.message = message || 'DB ERROR';
    }
}

module.exports = {
    LoginError,
    OperateError,
    Forbbiden,
    DBError
};