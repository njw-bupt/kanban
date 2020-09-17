import httpRequest from '../httpProxy';

export function getAllTasks(data){
    return httpRequest("GET","http://localhost:3000/allTasks",data);
}

export function addNewTask(data){
    return httpRequest("POST","http://localhost:3000/addNewTask",data);
}

export function deleteTask(data){
    return httpRequest("DELETE","http://localhost:3000/deleteTask",data)
}

export function updateTask(data){
    return httpRequest("PUT","http://localhost:3000/updateTask",data)
}