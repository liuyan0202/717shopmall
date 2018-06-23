<template>
    <div class="home_banner">
        <div class="home_swiper swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="./../static/img/home/1.png" alt=""/>
                </div>
                <div class="swiper-slide">
                    <img src="./../static/img/home/2.png" alt=""/>
                </div>
                <div class="swiper-slide">
                    <img src="./../static/img/home/3.png" alt=""/>
                </div>
                <div class="swiper-slide">
                    <img src="./../static/img/home/4.png" alt=""/>
                </div>
                <div class="swiper-slide">
                    <img src="./../static/img/home/5.png" alt=""/>
                </div>
            </div>
            <div class="page swiper-pagination"></div>
        </div>
        
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
//import Swiper from 'swiper'
export default {
    data(){
        return {}
    },
    mounted(){
        /* new Swiper('.home_swiper',{
            autoplay:{
                delay:2000
            },
            loop:true,
            pagination : '.page'
        }) */
    }
    
}
</script>
<style scoped>
.home_banner{
    width:100%;
    height:3.5rem;
    background: #fff;
}
.swiper-slide img{
    width:100%;
}
</style>
