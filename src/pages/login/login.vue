<template>
    <div class="login">
        <div class="login_header">
            <span @click="returnFn">返回</span>
            <h2>登录717</h2>
            <span class="registerbtn" @click="gotoRegister">注册</span>
        </div>
        <form action="" class="login_form">
            <p>
                <label class="iconfont icon-weibiaoti2fuzhi12"></label>
                <input type="text" placeholder="请输入您的手机号" v-model="user" />
            </p>
            <p>
                <label class="iconfont icon-suo1"></label>
                <input type="password" placeholder="请输入您的密码" v-model="pwd" />
            </p>
            
        </form>
        <button class="loginbtn" @click="gotoLogin">
            立即登录
            <p :class="flag?'errinfo active':'errinfo'">{{errinfo}}</p>
        </button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            user:'',
            pwd:'',
            repwd:'',
            errinfo:'',
            flag:false
        }
    },
    methods:{
        gotoLogin(){
            let regPhone = /^1[3578]\d{9}$/;
            let regPwd = /\d{4,8}/;
            if(!regPhone.test(this.user)){
                this.flag = true
                this.errinfo = '请输入正确格式的手机号'
                setTimeout(()=>{
                    this.flag=false
                },1000)
                return
            }
            if(!regPwd.test(this.pwd)){
                this.flag = true
                this.errinfo = '请输入4-8位的密码'
                setTimeout(()=>{
                    this.flag=false
                },1000)
                return
            }
            if(!this.user||!this.pwd){
                this.flag = true
                this.errinfo = '信息不能为空'
                setTimeout(()=>{
                    this.flag=false
                },1000)
                return
            }
            this.errinfo = '登录成功'
            this.$http.post('/user/login',{
                user:this.user,
                pwd:this.pwd
            }).then(res=>{
                if(res.data.code === 1){
                    document.cookie = `token=${res.data.token}`
                    this.$router.push({//从哪个页面进入的login页面，登录成功时直接进入此页面
                        name:this.$route.query.from||'home'
                    })
                    console.log('登录成功')
                } else if(res.data.code === 2) {
                    console.log(res.data.msg)
                    alert(res.data.msg)
                } else {
                    console.log(res.data.msg)
                    alert(res.data.msg)
                }
            })
        },
        gotoRegister(){
            this.$router.push({
                name:'register'
            })
        },
        returnFn(){
            this.$router.push({
                name:'home'
            })
        }
    }
}
</script>
<style scoped>

.login{
    width:100%;
    height:100%;
}
.login_header{
    width:100%;
    height:1rem;
    background: #fff;
    margin-bottom:10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 10px;
    box-sizing: border-box;
}
.registerbtn{
    color:red;
}
.login_form{
    width:100%;
    background: #fff;
}
.login_form p{
    width:100%;
    height:1rem;
    display: flex;
}
.login_form p label{
    width:1rem;
    text-align: center;
    height:100%;
    line-height: 1rem;
}
.login_form p input{
    flex:1;
    height:100%;
    border:0;
    outline: none;
    border-bottom:1px solid #ccc;
}
::-webkit-input-placeholder{
    color:rgb(173, 171, 171);
}
.loginbtn{
    position: relative;
    width:80%;
    height:1.2rem;
    border-radius: 50px;
    background: red;
    color:#fff;
    margin-top:2rem;
    margin-left:10%;
    outline: none;
    border:0;
}
.errinfo{
    position: absolute;
    width:100%;
    height:.7rem;
    left:0;
    top:-.9rem;
    border-radius:20px; 
    background: rgba(0,0,0,.6);
    color:rgb(223, 221, 221);
    text-align: center;
    line-height: .7rem;
    z-index: 10000;
    display: none;
}
.errinfo.active{
    display: block;
}
</style>
