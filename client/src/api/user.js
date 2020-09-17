import httpRequest from '../httpProxy';

export function login(data){
    return httpRequest("POST","http://localhost:3000/login",data);
}

export function register(data){
    return httpRequest("POST","http://localhost:3000/register",data);
}

export function uniqueName(data){
    return httpRequest("GET","http://localhost:3000/uniqueUsername",data);
}

export function getUserNameById(data){
    return httpRequest("GET","http://localhost:3000/getUserNameById",data);
}
