<template>
    <div class="addBox">
        <header class="header">
            <i class="icon iconfont icon-xaingzuo" @click="backFn"></i>
            <span>收货人</span>
            <span></span>
        </header>
        <div class="infor">
            <p><input type="text" placeholder="收货人姓名"></p>
            <p><input type="text" placeholder="手机号"></p>
            <p class="province">
                <select name="" id="">
                    <option value="北京">北京</option>
                    <option value="江苏">江苏</option>
                    <option value="广东">广东</option>
                </select>
                <select name="" id="">
                    <option value="北京">北京</option>
                    <option value="浙江">浙江</option>
                    <option value="广州">广州</option>
                </select>
            </p>
            <p class="area">
                <select name="" id="">
                    <option value="海淀区">海淀区</option>
                    <option value="大兴">大兴</option>                    
                    <option value="朝阳区">朝阳区</option>
                    <option value="通州">通州</option>
                </select>
            </p>
            <p><input type="text" name="" id="" placeholder="详细地址"></p>
            <div><span :class="flag?'iconfont icon-checked':'iconfont icon-unchecked'" @click="ischecked"></span><span>设为默认地址</span></div>
            <button class="save">保存</button>
        </div>
    </div>

</template>
<script>
export default {
    data(){
        return {
            flag:false
        }
    },
    methods: {
        backFn() {
            this.$router.push("/goodsaddress")
        },
        ischecked(){
            this.flag = !this.flag
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
.province{
    display: flex;
    justify-content: space-between;
}
.province select{
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



