const dbConfig = {
    database: 'kanban',
    username: 'root',
    password: '123456',
    details: {
        dialect: 'mysql',
        host: 'localhost',
        port: '3306',
        timezone: '+08:00',
        logging: false
    }  
}

const jwtConfig = {
    secret: 'shhhh',
    options: {
        algorithm: 'HS256',
        expiresIn: 60*60*2, //2h
    }   
}


module.exports = {
    dbConfig,
    jwtConfig,
}