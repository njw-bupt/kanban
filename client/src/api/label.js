import httpRequest from '../httpProxy';

export function getAllLabels(data){
    return httpRequest("GET","http://localhost:3000/allLabels",data);
}