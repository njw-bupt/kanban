export default async function(method, url, data){
    //获取token
    let token = window.localStorage.getItem('token');

    let response = '';
    let network = true;
    try{
        response = await new Promise((resolve,reject)=>{
            let handler = function() {
                if (this.readyState !== 4) {
                    return;
                }
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(new Error(this.statusText)); 
                }
            };
            const client = new XMLHttpRequest();

            //处理查询字符串         
            if(method === 'GET' && data){
                let params = [];
                for(let key in data){
                    params.push(`${key}=${data[key]}`);
                }
                params = params.join('&');
                url = url+'?'+params;
            }

            client.open(method, url);
            client.onreadystatechange = handler;
            client.setRequestHeader("Content-Type","application/json")
            if(token){
                client.setRequestHeader('Authorization',token);
            }

            switch(method){
                case 'POST':                    
                    client.send(JSON.stringify(data)); //obj->string
                    break;
                case 'GET':
                    client.send(); 
                    break;
                case 'DELETE':                    
                    client.send(JSON.stringify(data)); //obj->string
                    break;
                case 'PUT':                    
                    client.send(JSON.stringify(data)); //obj->string
                    break;
                default:
                    break;
            }
            
        })    
        }catch(e){
            network = false;
            throw new Error("network fail");
        }

        if(network){
            response = JSON.parse(response);
            switch(response.code){
                case 200:
                    return response.data;
                case 403:
                    //跳转登录页面
                    window.location.assign("http://localhost:8080/#/login");
                    return {};
                default:
                    //alert(response.message); //后台操作的error，有自定义的code和message
                    return {};
            }
        }
}