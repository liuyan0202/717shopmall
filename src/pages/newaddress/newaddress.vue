<template>
    <div class="addBox">
        <header class="header">
            <i class="icon iconfont icon-xaingzuo" @click="backFn"></i>
            <span>收货人</span>
            <span></span>
        </header>
        <div class="infor">
            <p><input type="text" placeholder="收货人姓名" v-model="name"></p>
            <p><input type="text" placeholder="手机号" v-model="phone"></p>
            <p class="pick">
                <select name="" id="province">
                    <option value="北京">北京</option>
                    <option value="浙江">浙江</option>
                    <option value="广东">广东</option>
                </select>
                <select name="" id="city">
                    <option value="北京">北京</option>
                    <option value="杭州">杭州</option>
                    <option value="广州">广州</option>
                </select>
            </p>
            <p class="area">
                <select name="" id="areas">
                    <option value="海淀区">海淀区</option>
                    <option value="大兴">大兴</option>                    
                    <option value="朝阳区">朝阳区</option>
                    <option value="通州">通州</option>
                </select>
            </p>
            <p><input type="text" name="" id="" placeholder="详细地址" v-model="detailAddress"></p>
            <div><span :class="flag?'iconfont icon-checked':'iconfont icon-unchecked'" @click="ischecked"></span><span>设为默认地址</span></div>
            <button class="save" @click="save">保存</button>
        </div>
    </div>

</template>
<script>
import { getCookie } from '@/utils/cookie'
export default {
    data(){
        return {
            flag:false,
            info:{},
            name:'',
            phone:'',
            detailAddress:''
        }
    },
    methods: {
        backFn() {
            this.$router.push("/goodsaddress");
        },
        ischecked(){
            this.flag = !this.flag
        },
        save(){
            //省
            let myprovince = document.getElementById("province");
            let index = myprovince.selectedIndex ;
            let proval = myprovince.options[index].value;
            //市
            let mycity = document.getElementById("city");
            let ind = mycity.selectedIndex;
            let cityval = mycity.options[ind].value;
            //区
            let myarea = document.getElementById("areas");
            let i = myarea.selectedIndex;
            let areaval = myarea.options[i].value;

            if(!this.name){
                alert('请输入收件人姓名')
                return
            }
            let reg = /^1[3578]\d{9}$/;
            if(!this.phone){
                alert('手机号不能为空')
                return
            }
            if(!reg.test(this.phone)){
                alert('请填写正确的手机号')
                return
            }
            if(!this.detailAddress){
                alert('请输入详细地址')
                return
            }
            let obj = {
                name:this.name,
                phone:this.phone,
                province:proval,
                city:cityval,
                area:areaval,
                detailAddress:this.detailAddress
            }
            this.$http.post('/newAddress',{
                token:getCookie('token'),
                obj:obj
            }).then(res=>{
                console.log(res.data)
            })
        }
    }
}
</script>
<style scoped>
.addBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.header {
    height: 1rem;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #ccc;
}
.infor {
    box-sizing: border-box;
    padding: 10px;
    flex: 1;
}
.infor p {
    width:100%;
    height: 1rem;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom:10px;
}
.infor p input {
    background: #fff;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    text-indent: 1em;
}
.pick{
    display: flex;
    justify-content: space-between;
}
.pick select{
    width:40%;
    border:none;
}
.area select{
    width:100%;
    height: 100%;
    border:none;
    outline: none;
}
.area select option{
     width:100%;
}
.save{
    width:80%;
    height:1rem;
    margin: 25px 0 0 10%;
    background: red;
    color:#fff;
    border-radius: 1rem;
    border:0;
    outline: none;
}
.icon-unchecked,.icon-checked{
    font-size:.56rem;
    vertical-align: middle;
}
.icon-checked{
    color: red;
}
</style>



