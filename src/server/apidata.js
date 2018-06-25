const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');//用户信息加密
module.exports = function(app){
    //请求路径
    let readPath = path.resolve(__dirname+'/goodsdata')
    app.get('/index/recommend.action',(req,res)=>{
            let result = fs.readFileSync(readPath+`/data${req.query.page}.json`,'utf-8');
            res.json(result)
    })
    //分类接口
    const queryApi = require('./queryApi');
    app.get('/index.php',(req,res)=>{
        queryApi(`/index.php?ctl=goods_class&act=ajaxGetClassList&cid=${req.query.cid}`).then(data=>{
            res.end(data)
        })
    })
    //注册接口
    let userPath = path.resolve(__dirname+'/userInfo')
    app.post('/user/register',(req,res)=>{
        let userlist = JSON.parse(fs.readFileSync(userPath+'/userinfo.json','utf-8'))
        if(userlist.some((v)=>{
            return v.user === req.body.user //返回true或false
        })){
            res.json({
                msg:'faild',
                info:'该用户已存在',
                code:2
            })
            return
        } else {
            userlist.push(req.body)
            fs.writeFile(userPath+'/userinfo.json',JSON.stringify(userlist),(err)=>{
                if(err){
                    res.json({
                        msg:err,
                        code:0
                    })
                } else {
                    res.json({
                        msg:'success',
                        code:1
                    })
                }
            })
        }
    })

    //登录接口
    app.post('/user/login',(req,res)=>{
        let userlist = JSON.parse(fs.readFileSync(userPath+'/userinfo.json','utf-8'))
        if(userlist.some((v)=>{
            return v.user === req.body.user && v.pwd === req.body.pwd //返回true或false
        })){
            let token = jwt.sign(req.body,'liuyan');//生成加密，密钥为'liuyan'
            res.json({
                code:1,
                msg:'success',
                token:token
            })
        } else if(userlist.some((v)=>{
            return v.user !== req.body.user && v.pwd !== req.body.pwd
        })){
            res.json({
                code:2,
                msg:'该用户不存在，请先注册'
            })
        } else {
            res.json({
                code:0,
                msg:'用户或密码错误'
            })
        }
    })

    //购物车列表
    app.post('/goodslist',(req,res)=>{
        jwt.verify(req.body.token,'liuyan',(err,decoded)=>{
            if(err){
                res.json({
                    msg:err,
                    code:0
                })
            } else {
                let listpath = path.resolve(__dirname+'/shopcarList/shopcarlist.json');
                let usergoods = JSON.parse(fs.readFileSync(listpath,'utf-8'));
                res.json({
                    msg:'success',
                    code:1,
                    usergoods:usergoods[decoded.user]||[]
                })
            }
        })
    })

    //加入购物车
    app.post('//user/shopcar',(req,res)=>{
        jwt.verify(req.body.token,'liuyan',(err,decoded)=>{//token解码
            if(err){
                res.json({
                    msg:'登录超时请重新登录',
                    code:0
                })
            } else {
                let listpath = path.resolve(__dirname+'/shopcarList/shopcarlist.json');
                let usergoods = JSON.parse(fs.readFileSync(listpath,'utf-8'));
                if(usergoods[decoded.user]){//判断此用户是否已存在
                    //???应该在这判断有没有添加同一个货品
                    let flag = false
                    usergoods[decoded.user].forEach((item,index)=>{
                        if(item.wname===req.body.data.wname){
                            ++item.count;
                            flag = true
                        }
                    })
                    if(!flag){
                        let newData = {
                            ...req.body.data,
                            count:1
                        }
                        usergoods[decoded.user].push(newData)//存在就在数据后push
                    }
                } else {
                    usergoods[decoded.user] = [{count:1,...req.body.data}]//不存在则直接添加
                }
                fs.writeFile(listpath,JSON.stringify(usergoods),(err)=>{//将读取的数据写入到文件中
                    if(err){
                        res.json({
                            msg:'写入错误',
                            code:0
                        })
                    } else {
                        res.json({
                            msg:'加入购物车成功',
                            code:1
                        })
                    }
                })
            }
        })
    })

    //加入购买订单列表
    app.post('/buygoods',(req,res)=>{
        jwt.verify(req.body.token,'liuyan',(err,decoded)=>{//token解码
            if(err){
                res.json({
                    msg:'登录超时请重新登录',
                    code:0
                })
            } else {
                let listpath = path.resolve(__dirname+'/buygoods/buygoods.json');
                let buygoods = JSON.parse(fs.readFileSync(listpath,'utf-8'));
                //console.log(req.body.name)
                if(buygoods.length>0){
                    let isRepeat = false
                    buygoods.forEach((v,i)=>{
                        req.body.goodsdata.forEach((item,ind)=>{
                            if(item.wname === v.wname){//有重复
                                v.count = v.count+item.count
                                isRepeat = true
                            }
                        })
                    })
                    if(!isRepeat){
                        buygoods.push(req.body.goodsdata)//存在就在数据后push
                    }
                } else {
                   buygoods = req.body.goodsdata
                }
                fs.writeFile(listpath,JSON.stringify(buygoods),(err)=>{//将读取的数据写入到文件中
                    if(err){
                        res.json({
                            msg:'添加失败',
                            code:0
                        })
                    } else {
                        res.json({
                            msg:'成功添加至购买列表',
                            code:1
                        })
                    }
                })
            } 
        })
    })

//读取购买列表
app.post('/getbuygoods',(req,res)=>{
    jwt.verify(req.body.token,'liuyan',(err,decoded)=>{
        if(err){
            res.json({
                msg:err,
                code:0
            })
        } else {
            let listpath = path.resolve(__dirname+'/buygoods/buygoods.json');
            let buylist = JSON.parse(fs.readFileSync(listpath,'utf-8'));
            res.json({
                msg:'success',
                code:1,
                buylist:buylist||[]
            })
        }
    })
})

//清除购买列表
app.post('/clearBuylist',(req,res)=>{
    jwt.verify(req.body.token,'liuyan',(err,decoded)=>{
        if(err){
            res.json({
                msg:err,
                code:0
            })
        } else {
            let listpath = path.resolve(__dirname+'/buygoods/buygoods.json');
            let buylist = JSON.parse(fs.readFileSync(listpath,'utf-8'));
            buylist = [];
            fs.writeFile(listpath,JSON.stringify(buylist),(err)=>{//将数据清空
                if(err){
                    res.json({
                        msg:'清空失败',
                        code:0
                    })
                } else {
                    res.json({
                        msg:'成功清空列表',
                        code:1
                    })
                }
            })
        }
    })
})

//加减数量
app.post('/goods/changeNum',(req,res)=>{
    jwt.verify(req.body.token,'liuyan',(err,decoded)=>{//token解码
        if(err){
            res.json({
                msg:'登录超时请重新登录',
                code:0
            })
        } else {
            let listpath = path.resolve(__dirname+'/shopcarList/shopcarlist.json');
            let usergoods = JSON.parse(fs.readFileSync(listpath,'utf-8'));
                usergoods[decoded.user].forEach((item,index)=>{
                    if(item.wname===req.body.wname){
                        item.count = req.body.count
                    }
                })
            fs.writeFile(listpath,JSON.stringify(usergoods),(err)=>{//将读取的数据写入到文件中
                if(err){
                    res.json({
                        msg:'写入错误',
                        code:0
                    })
                } else {
                    res.json({
                        msg:'数量改变成功',
                        code:1
                    })
                }
            })
        }
    })
})

//删除购物车列表项
app.post('/goodsdel',(req,res)=>{
    jwt.verify(req.body.token,'liuyan',(err,decoded)=>{//token解码
        if(err){
            res.json({
                msg:'登录超时请重新登录',
                code:0
            })
        } else {
            let listpath = path.resolve(__dirname+'/shopcarList/shopcarlist.json');
            let usergoods = JSON.parse(fs.readFileSync(listpath,'utf-8'));
                let delindex=[]
                usergoods[decoded.user].forEach((item,index)=>{
                    req.body.name.forEach((v,i)=>{
                        if(item.wname === v){
                            delindex.push(index)
                        }
                    })
                })

                let newarr=[]
                let str=''
                delindex.map((i)=>{
                    str +=usergoods[decoded.user].splice(i,i+1)
                })
                usergoods[decoded.user].map(i=>{
                    //console.log(i)
                    console.log(str)
                    if(str.indexOf(i)==-1){
                        newarr.push(i)
                    }
                    //console.log(newarr)
                })
                
            fs.writeFile(listpath,JSON.stringify(usergoods),(err)=>{//将读取的数据写入到文件中
                if(err){
                    res.json({
                        msg:'写入错误',
                        code:0
                    })
                } else {
                    res.json({
                        msg:'加入购物车成功',
                        code:1
                    })
                }
            })
        }
    })
})
//添加地址
app.post('/newAddress',(req,res)=>{
    
})
}