<template>
    <div class="detail_shop">

        <div class="shop_img">
            <img :src="list.imageurl" alt="">
        </div>
        <div class="shop_info">
            <p>{{list.wname}}</p>
            <span>￥{{list.jdPrice}}</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:''
        }
    },
    mounted(){
        this.list = this.$route.query
        console.log(this.list)
    }
    
}
</script>
<style scoped>
.detail_shop{
    width:100%;
    height:100%;
    overflow-y: scroll;
}
.shop_img{
    display: flex;
    width:100%;
    height:6rem;
    background: #fff;
    border-bottom:1px solid #ccc;
    align-items: center;
    justify-content: center;
}
.shop_img img{
    width:50%;
}
.shop_info{
    background: #fff;
    border-bottom:1px solid #ccc;
}
.shop_info p{
    padding:0 10px;
}
.shop_info span{
    display: inline-block;
    margin-top:10px;
    color:red;
    height:.5rem;
    line-height: .5rem;
    padding:0 10px;
}
</style>
