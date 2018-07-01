const express = require('express');
const apidata = require('./apidata');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const ejs = require('ejs')
app.engine('html',ejs.__express)
app.set('view engine','html')
app.use(express.static(path.resolve(process.cwd()+'/../')))
app.all('*',function(req,res,next){
    res.header({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Content-Type'
    })
    next()
})
//localhost:3000/build.js是build文件
app.get('/',function(req,res,next){//打包后的接口，localhost:3000
    res.render('index',{title:'HTML'})
})
app.get('/index/home',function(req,res,next){//打包后的接口，localhost:3000
    res.render('index',{title:'HTML'})
})
apidata(app);

app.listen('3000',function(){
    console.log('server 3000')
})