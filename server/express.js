const express = require('express');
const apidata = require('./apidata');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const ejs = require('ejs')
app.engine('html',ejs.__express)
app.set('view engine','html')
app.use(express.static(path.resolve(process.cwd()+'/../../dist/')))
app.all('*',function(req,res,next){
    res.header({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Content-Type'
    })
    next()
})
app.get('/indexs/',function(req,res,next){
    res.render('index',{title:'HTML'})
})
apidata(app);

app.listen('3000',function(){
    console.log('server 3000')
})