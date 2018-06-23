<template>
<!--收货地址-->
    <div class="goodsBox">
        <header class="header">
            <i class="icon iconfont icon-xaingzuo" @click="backFn"></i>
            <span>收货地址</span>
            <span></span>
        </header>
        <div class="addressbox">
            <div class="inforBox">
                <p class="userinfo">
                    <span>路飞</span>
                    <span>13344443344</span>
                </p>
                <p class="detail_address"><i class="iconfont icon-dizhi"></i>北京市海淀区知春路北京市海淀区知春路北京市海淀区知春路</p>
                <div class="defult">
                    <aside>
                        <span :class="flag?'iconfont icon-checked':'iconfont icon-unchecked'" @click="ischecked"></span>
                        <span>默认地址</span>
                    </aside>
                    <aside>
                        <span>编辑</span>
                        <span>删除</span>
                    </aside>
                </div>
            </div>
        </div>
        <button class="addFooter" @click="newAdd()"><i class="iconfont icon-jia"></i>新增地址</button>
    </div>

</template>
<script>
export default {
    data(){
        return {
            flag:false
        }
    },
    methods:{
        backFn(){
            this.$router.push({name:"orderpay"})
        },
        ischecked(){
            this.flag=!this.flag
        },
        newAdd(){
            this.$router.push({name:"newaddress"})
        }
    }
}
</script>
<style scoped>
.goodsBox{
    position: relative;
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.header {
  height: 1rem;
  align-items: center;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid #ccc;
}
.inforBox{
    background: #fff;
    margin-bottom:10px;
    padding:0 15px;
    box-sizing: border-box;
}
.userinfo{
    width:100%;
    height:1rem;
    display: flex;
    align-items: center;
}
.userinfo span{
    margin-right:10px;
}
.detail_address{
    width:100%;
    line-height: .6rem;
    border-bottom:1px solid #ccc;
    color:#666;
}
.defult{
    width:100%;
    display: flex;
    height:1rem;
    justify-content: space-between;
    align-items: center;
}
.icon-unchecked,.icon-checked{
    font-size:.56rem;
    vertical-align: middle;
}
.icon-checked{
    color: red;
}
.addFooter{
    position: absolute;
    left:10%;
    bottom:1rem;
    width:80%;
    height:1rem;
    background: red;
    color:#fff;
    border-radius: 1rem;
    border:0;
    outline: none;
    font-size:.4rem;
}
.icon-dizhi{
    margin-right:10px;
}
</style>



