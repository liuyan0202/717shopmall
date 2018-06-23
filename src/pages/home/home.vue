<template>
    <div class="home">
        <header>
            <span class="logo">
                <img src="./../../static/img/home/logo.png" alt=""/>
            </span>
            <p>
                <i class="icon iconfont icon-fangdajing search"></i>
                <input type="text" placeholder="请输入您要购买的商品" @focus="searchFn"/>
            </p>
            <span class="shop"><i class="icon iconfont icon-shop"></i><b>我的店铺</b></span>
            <span><i class="icon iconfont icon-xiaoxi"></i><b>消息</b></span>
        </header>
        <div class="home_wrap" @scroll="scrollFn" ref="home_wrap">
            <div class="home_top" ref="home_top">
                <Banner />
                <Iconlist />
                <div class="Mall_dynamic">
                    <div class="home_left">商城动态</div>
                    <div class="home_right swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                最新商城动力顺境噬魂师影某某噼里啪
                            </div>
                            <div class="swiper-slide">
                                最新商城动力顺境噬魂师影某某噼里啪
                            </div>
                            <div class="swiper-slide">
                                最新商城动力顺境噬魂师影某某噼里啪
                            </div>
                        </div>
                    </div>
                </div>
                <div class="home_everyday">
                    <p><span class="one">天天特惠</span><span>每天都有惊喜</span></p>
                    <p>更多</p>
                </div>
                <div class="home_discounts">
                    <div><img src="./../../static/img/home/6.png"/></div>
                    <div>
                        <div><img src="./../../static/img/home/7.png"/></div>
                        <div><img src="./../../static/img/home/8.png"/></div>
                    </div>
                </div>
                <div class="home_like">————  猜你喜欢  ————</div>
            </div>
            
            <div class="home_goods" ref="home_goods">
                <Goodslist v-for="(x,index) in goodslist" :key="index" :data="x"></Goodslist>
            </div>
            <p class="tip">{{tips}}</p>
        </div>
        <Message ref="message"></Message>
    </div>
</template>
<script>
import jsonp from '@/utils/jsonp.js'
import 'swiper/dist/css/swiper.css'
//import Swiper from 'swiper'
import Banner from '@/components/banner'
import Iconlist from '@/components/iconlist'
import Goodslist from '@/components/goodslist'
export default {
    data(){
        return {
            goodslist:[],
            flag:true,
            page:1,
            tips:'正在加载数据。。。'
        }
    },
    methods:{
        scrollFn(){//懒加载
            let windowH = this.$refs.home_wrap.offsetHeight;
            let docH = this.$refs.home_top.offsetHeight + this.$refs.home_goods.offsetHeight;
            let scrollTop = this.$refs.home_wrap.scrollTop;
            if(docH-windowH-scrollTop<30&&this.flag){
                this.page++;
                this.flag = false;
                if(this.page<=3){
                    this.$http(`http://localhost:3000/index/recommend.action?page=${this.page}`).then(res=>{
                        this.goodslist = [...this.goodslist,...JSON.parse(JSON.parse(res.data).recommend).wareInfoList]
                        this.flag = true
                    })
                } else {
                    this.tips = '没有更多数据了哦。。。'
                }
                
            }
        },
        searchFn(){
            this.$router.push({
                name:'search'
            })
        }
    },
    mounted(){
        /* new Swiper('.home_right',{
            autoplay:{
                delay:1000
            },
            loop:true,
            direction:'vertical',
            slidesPerView :'auto'
        }) */
        this.$http(`/index/recommend.action?page=${this.page}`).then(res=>{
            this.goodslist = JSON.parse(JSON.parse(res.data).recommend).wareInfoList
        })
    },
    components:{
        Banner,
        Iconlist,
        Goodslist
    }
}
</script>
<style scoped src='./home.css'>
</style>
