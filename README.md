# 717mall
### 一、项目技术描述(vue框架)

    *1 使用vue-router路由:
    
    *2 使用vuex进行数据管理

    *3 对axios进行封装

    *4 用导航守卫做登录权限，在cookie里存储token字段，并使用jsonwebtoken对用户信息进行加密

    *5 用vue-lazyload进行懒加载

### 二、项目文件介绍
* 1 router ==> router.js做路由配置，使用history模式，使用导航守卫，cookie里存的token字段做登录权限

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

* 2 ultils ==> request.js封装axios的$http请求,==>cookie.js对设置cookie，获取cookie和删除cookie的封装，==>jsonp.js做跨域请求

* 3 store==>store.js做数据管理

* 4 server==>goodsdata列表数据,userinfo==>用户信息,express.js==>app.express(),apidata.js==>请求get或post,queryApi.js==>封装node的http请求,buygoods==>购买商品列表,goodsdata==>商品列表,nobuygoods==>待支付列表

babel-plugin-syntax-dynamic-import(按需加载)

     
