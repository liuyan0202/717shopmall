# 717mall
### 一、项目技术描述(vue框架)

* 1、使用vue-router路由:
    
* 2、使用vuex进行数据管理

* 3、对axios进行封装

* 4、用导航守卫做登录权限，在cookie里存储token字段，并使用jsonwebtoken对用户信息进行加密

* 5、用vue-lazyload进行懒加载

* 6、用动态import实现按需加载

* 7、用h5新增的formData代替原有的form表单提交文件的方法，并借用multer插件对数据进行解析

### 二、项目文件介绍
* 1、router <br/>
        * router.js ==> 做路由配置，使用history模式，使用导航守卫，cookie里存的token字段做登录权限

            router.beforeEach((to,from,next)=>{
            if(to.name==='shopcar'||to.name==='mine'){
                let token = getCookie('token')
                if(!token){
                    next({
                        name:'login',
                        query:{
                            from:to.name
                        }
                    })
                } else {
                    next()
                }
            } else {
                next()
            }
        })

* 2、ultils <br/>
    * request.js ==> 封装axios的$http请求
    * cookie.js ==> 对设置cookie，获取cookie和删除cookie的封装
    ```
        /**
        * 设置cookie
        * @param name cookie的名称
        * @param value cookie的值
        * @param day cookie的过期时间
        */
        var setCookie = function (name, value, day) {
        if (day !== 0) { //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
            var expires = day * 24 * 60 * 60 * 1000;
            var date = new Date(+new Date() + expires);
            document.cookie = name + "=" + decodeURI(value) + ";expires=" + date.toUTCString();
        } else {
            document.cookie = name + "=" + decodeURI(value);
        }
        };

        /**
        * 获取对应名称的cookie
        * @param name cookie的名称
        * @returns {null} 不存在时，返回null
        */
        var getCookie = function (name) {
        var arr;
        var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)){
            return decodeURI(arr[2]);
        } else {
            return null;
        } 
        };

        /**
        * 删除cookie
        * @param name cookie的名称
        */
        
        var delCookie = function (name) {//将有效期设为失效，则删除cookie
            setCookie(name, ' ', -1);
        };
        export {setCookie,getCookie,delCookie}
    ```
    * jsonp.js ==> 做跨域请求

* 3 store
    * store.js ==> 做数据管理

* 4 server
    * goodsdata ==> 列表数据
    * userinfo ==> 用户信息
    * express.js ==> app.express()
    * apidata.js ==> 接口
    * queryApi.js ==> 封装node的http请求
    * buygoods ==> 购买商品列表
    * goodsdata ==> 商品列表
    * nobuygoods ==> 待支付列表
* 5 message
    * message.js ==> 封装提示信息插件
    
### 三、引用第三方插件
`babel-plugin-syntax-dynamic-import`(用动态import做按需加载)<br/>
`vue-multiselect` (vue第三方select)<br/>
`jsonwebtoken`(对用户信息进行加密)<br/>
`multer`(用formData做文件上传时，对数据（二进制数据）进行解析)<br/>
`vue-lazyload`(懒加载)






     
