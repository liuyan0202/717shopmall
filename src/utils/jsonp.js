//1.动态创建script
//2.src
//3.callback
function jsonp(url,callbackName){//callname为一个函数
    return new Promise((resolve,reject)=>{
        window[callbackName] = function(data){
            resolve(data.data)
        }

        let script = document.createElement('script');
        let body = document.body;
        script.src = url;
        body.appendChild(script);
    })
    
}
export default jsonp;