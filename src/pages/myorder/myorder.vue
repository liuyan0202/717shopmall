<template>
<!--我的订单-->
    <div class="myorder">
        <div class="order_header">
            <i class="iconfont icon-xaingzuo"></i>
            <span>我的订单</span>
            <i class="iconfont icon-xiaoxi"></i>
        </div>
        <div class="order_tab">
            <router-link tag="span" :to="{name:'order_all'}">
                全部
            </router-link>
            <router-link tag="span" :to="{name:'order_nopay'}">
                待付款
            </router-link>
            <router-link tag="span" :to="{name:'order_nosend'}">
                待发货
            </router-link>
            <router-link tag="span" :to="{name:'order_notake'}">
                待收货
            </router-link>
            <router-link tag="span" :to="{name:'order_aftersale'}">
                售后
            </router-link>
        </div>
        <div class="order_count">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.myorder{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
}
.order_header{
    width:100%;
    height:1rem;
    display: flex;
    justify-content: space-between;
    padding:0 10px;
    box-sizing: border-box;
    align-items: center;
    border-bottom:1px solid #ccc;
}
.order_tab{
    width:100%;
    height:1rem;
    border-bottom:1px solid #ccc;
    background: #fff;
    display: flex;
    align-items: center;
}
.order_tab span{
    height:100%;
    text-align: center;
    line-height: 1rem;
    flex:1;
}
.router-link-active{
    color:red;
    border-bottom:1px solid red;
}
</style>
