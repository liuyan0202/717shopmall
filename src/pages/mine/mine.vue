<template>
    <div class="mine">
        <div class="mine_tops">
            <header class="mine_header">
                <i class="icon iconfont icon-shezhi" @click="tips"></i>
                <span>我的717商城</span>
                <i></i>
            </header>
            <div class="mine_top">
                <div class="mine_img">
                    <img src="../../static/img/mine/heade.png" alt="">
                </div>
                <p>路飞</p>
            </div>
        </div>
        <div class="mine_bot">
            <div class="mine_shop">
                <span @click="clickfn">
                    <i class="icon iconfont icon-shop"></i>
                    我的店铺
                </span>
                <i class="icon iconfont icon-xiangyou"></i>
            </div>
            <ul class="mine_order">
                <router-link tag="li" :to="{name:'myorder',query:{from:'mine',ind:0}}">
                    <i class="icon iconfont icon-dengdaifukuan"></i>
                    <span>待付款</span>
                </router-link>
                <router-link tag="li" :to="{name:'myorder',query:{from:'mine',ind:1}}">
                    <i class="icon iconfont icon-dengdaifukuan"></i>
                    <span>待收货</span>
                </router-link>
                <router-link tag="li" :to="{name:'myorder',query:{from:'mine',ind:2}}">
                    <i class="icon iconfont icon-dengdaifukuan"></i>
                    <span>待发货</span>
                </router-link>
                <router-link tag="li" :to="{name:'myorder',query:{from:'mine',ind:3}}">
                    <i class="icon iconfont icon-dengdaifukuan"></i>
                    <span>我的订单</span>
                </router-link>
            </ul>
            <ul class="mine_list">
                <li>
                    <p>
                    <i class="icon iconfont icon-daifukuan"></i>
                        <span>账号余额<b class="building icon iconfont icon-building-automation"></b></span>
                    </p>
                    <i class="icon iconfont icon-xiangyou"></i>
                </li>
                <li>
                    <p>
                        <i class="icon iconfont icon-dizhi"></i>
                        <span>地址管理</span>
                    </p>
                    <i class="icon iconfont icon-xiangyou"></i>
                </li>
                <li>
                    <p>
                        <i class="icon iconfont icon-service"></i>
                        <span>我的客服</span>
                    </p>
                    <i class="icon iconfont icon-xiangyou"></i>
                </li>
            </ul>
            <Message ref="message"></Message>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        tips(){
            this.$refs.message.active('消息提示成功')
        },
        clickfn(){
            this.$refs.message.active('消息')
        }
    }
}
</script>
<style scoped>
.mine{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
}
.mine_tops{
    width:100%;
    height:3rem;
    background:red;
    background:url('./../../static/img/mine/bg.png') center;
    background-size:100% 100%;
}
.mine_bot{
    flex:1;
    overflow-y:scroll;
}
.mine_header {
    box-sizing: border-box;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    font-size:.4rem;
    color:#fff;
}
.mine_top {
    height: 2rem;
    width: 100%;
}
.mine_shop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 1.32rem;
    border-bottom:1px solid #ccc;
    color: #fc4141;
    box-sizing: border-box;
    font-size:.4rem;
    background: #fff;
}
.mine_shop span i.icon {
    font-size:.6rem;
}
.mine_order {
    display: flex;
    justify-content: space-around;
    height: 1.5rem;
    background: #fff;
    align-items: center;
}
.mine_order li {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size:.3rem;
}
.mine_order li span{
    line-height: .5rem;
}
.mine_order li i.icon {
    font-size: .5rem;
}
.mine_list{
    background: #fff;
    margin:10px 0;
}
.mine_list li i.icon{
    font-size:.5rem;
}
.mine_list li{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 1.2rem;
    line-height: 1.2rem;
    border-bottom: 1px solid #eee;
    font-size:.3rem;
}
.mine_list li .building{
    margin-left:8px;
    font-size:.5rem;
}
.mine_img{
    width:1.4rem;
    height:1.4rem;
    background: red;
    margin:0 auto;
    border-radius: 50%;
    overflow: hidden;
}
.mine_img img{
    width:100%;
}
.mine_top p{
    text-align: center;
    width:100%;
    line-height: .4rem;
    color:#fff;
}
</style>

