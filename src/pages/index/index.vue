<template>
    <div class="index_page">
        <section>
            <router-view></router-view>
        </section>
        <footer>
            <router-link :to="{name:'home'}" tag="div"><span class="icon iconfont icon-shouye"></span><span>首页</span></router-link>
            <router-link :to="{name:'classify'}" tag="div"><span class="icon iconfont icon-fenlei"></span><span>分类</span></router-link>
            <router-link :to="{name:'shopcar'}" tag="div"><span class="index_car iconfont icon-gouwuche"><i class="sub_sum">{{$store.state.num}}</i></span><span>购物车</span></router-link>
            <router-link :to="{name:'mine'}" tag="div"><span class="icon iconfont icon-weibiaoti2fuzhi12"></span><span>我的</span></router-link>
        </footer>
    </div>
</template>
<script>
import './../../static/font/iconfont.css'
export default {
}
</script>
<style scoped>
.index_page{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
}
.index_page footer{
    height:.9rem;
    border-top:1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #fff;
}
.index_page footer div{
    display: flex;
    flex-direction: column;
    text-align: center;
}
.index_page section{
    flex:1;
    overflow: hidden;
}
.router-link-active{
    color:rgb(245, 66, 66);
}
.index_car{
    position: relative;
}
.sub_sum{
    position: absolute;
    color:red;
    font-style: normal;
    font-size:.2rem;
    top:-.1rem;
    right:0;
}
</style>
