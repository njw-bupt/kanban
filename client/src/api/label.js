import httpRequest from '../httpProxy';

export function getAllLabels(data){
    return httpRequest("GET","http://localhost:3000/allLabels",data);
}

export function addLabel(data){
    return httpRequest("POST","http://localhost:3000/addLabel",data);
}

export function editLabel(data){
    return httpRequest("PUT","http://localhost:3000/editLabel",data);
}

export function deleteLabel(data){
    return httpRequest("DELETE","http://localhost:3000/deleteLabel",data);
}