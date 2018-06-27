const http = require("http");  
//https://m.gome.com.cn/index.php?ctl=goods_class&act=ajaxGetClassList&cid=17951828
function queryApi(url){
    return new Promise((resolve,reject)=>{
        const opt = {
            hostname:'m.gome.com.cn',
            port:'80',
            path:url,
            method:'GET',
            headers:{
                //"Content-Type": 'application/json'
            }
        }
          
        let data = '';
        const req = http.request(opt, (res)=>{
            console.log("response: " + res.statusCode); 
            res.setEncoding('utf8');
            res.on('data',(chunk)=>{
                data += chunk;
            });
            res.on('end', ()=>{
                resolve(data)
            });
        })
        req.on('error', (e)=>{
            reject("error: " + e.message); 
        })
        req.end();
    })
}
module.exports = queryApi;
 