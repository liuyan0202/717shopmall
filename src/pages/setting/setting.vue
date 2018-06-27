<template>
    <!-- 从我的页进入到设置页 -->
    <div class="set">
        <div class="set_head">
            <span class="iconfont icon-xaingzuo" @click="backFn"></span>
            <p>设置</p>
            <span></span>
        </div>
        <div class="set_cont">
            <p class="myhead">
                <span>我的头像</span>
                <span class="set_rightone">
                    <b class="set_img"><img :src="url" alt=""></b>
                    <i class="iconfont icon-xiangyou"></i>
                    <input type="file" class="file" @change="uploadFn">
                </span>
            </p>
            <p><span>用户名</span><span><b>路飞</b><i class="iconfont icon-xiangyou"></i></span></p>
            <p><span>我的二维码名片</span><span><b></b><i class="iconfont icon-xiangyou"></i></span></p>
        </div>
        <button class="exit" @click="exitFn">退出登录</button>
        <div class="marsk" v-show="flag"></div>
    </div>
</template>
<script>
import { getCookie, delCookie } from '@/utils/cookie'
export default {
    data(){
        return {
            flag:false,
            url:'./../../static/img/mine/heade1.png'
        }
    },
    methods:{
        exitFn(){
            if(confirm('确定要退出吗')){
                delCookie('token');//删除用户
                this.$router.push({
                    name:'home'
                })
            }
        },
        backFn(){
            this.$router.push({
                name:'mine'
            })
        },
        uploadFn(e){
            let formData = new FormData();
            formData.append('img',e.target.files[0])
            this.$http.post('/uploadFile',formData).then(res=>{
                this.url = res.data.file
            })
        }
    },
    mounted(){
        //this.url = 'http://localhost:8080/server/upload/img-1530084747500.jpg'
    }
}
</script>
<style scoped>
.set{
    width:100%;
    height:100%;
    position: relative;
}
.set_head{
    width:100%;
    height:1rem;
    display: flex;
    justify-content: space-between;
    padding:0 10px;
    box-sizing: border-box;
    align-items: center;
    background: #fff;
    margin-bottom:10px;
}
.set_cont{
    width:100%;
    background: #fff;
    padding:0 10px;
    box-sizing: border-box;
}
.set_cont .myhead{
    height:1.2rem;
}
.set_rightone{
    position: relative;
    height:1.2rem;
    display: flex;
    align-items: center;
}
.set_rightone .file{
    position: absolute;
    height:100%;
    opacity: 0;
}
.set_img{
    display: inline-block;
    height:100%;
    width:1.2rem;
    border-radius: 50%;
    border:1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.set_img img{
    width:100%;
    height:100%;
}
.set_cont p{
    height:1rem;
    border-bottom:1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.set_cont p span i{
    margin-left:5px;
}
.exit{
    position: absolute;
    width:80%;
    height:1rem;
    background: rgb(250, 62, 62);
    color:#fff;
    border-radius: 1rem;
    left:50%;
    top:50%;
    transform: translate3d(-50%,-50%,0);
    border:0;
    outline: none;
}
.marsk{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height: 100%;
    background:rgba(0,0,0,.6);
}
</style>
