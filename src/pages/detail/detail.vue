<template>
    <div class="detail">
        <div class="detail_top">
            <span @click="returnFn" class="iconfont icon-xaingzuo"></span>
            <router-link :to="{name:'detail_shop',query:data}" tag="span">商品</router-link>
            <router-link :to="{name:'detail_ask',query:data}" tag="span">详情</router-link>
            <span class="icon iconfont icon-xiaoxi"></span>
        </div>
        <div class="detail_center">
            <router-view></router-view>
        </div>
        <div class="detail_footer">
            <span><i class="iconfont icon-service"></i><b>客服</b></span>
            <span><i class="iconfont icon-gouwuche"></i><b>购物车</b></span>
            <button class="detail_addCar">加入购物车</button>
            <button class="detail_buy">立即购买</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            data:''
        }
    },
    mounted(){
        this.data = this.$route.query
    },
    methods:{
        returnFn(){
            this.$router.push({
                name:'home'
            })
        }
    }
}
</script>
<style scoped>
.detail{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
}
.detail .detail_top{
    background: #fff;
    width:100%;
    height:1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom:1px solid #ccc;
}
.detail_top span{
    text-align: center;
    height:100%;
    line-height: 1rem;
}
.detail_top .router-link-active{
    border-bottom:1px solid #000;
}
.detail_center{
    flex:1;
}
.detail_footer{
    width:100%;
    height:1rem;
    border-top:1px solid #ccc;
    display: flex;
    justify-content: space-between;
    background: #fff;
    align-items: center;
}
.detail_footer span{
    width:1.4rem;
    text-align: center;
    display: flex;
    flex-direction: column;

}
.detail_footer button{
    flex:1;
    height:100%;
    border:0;
    color:#fff;
    outline: none;
}
.detail_footer .detail_addCar{
    background: rgb(231, 145, 145);
}
.detail_footer .detail_buy{
    background: rgb(221, 65, 65);
}

</style>
