<template>
    <dl @click="gotoDetail">
        <dt>
            <img v-lazy="data.imageurl" alt="">
        </dt>
        <dd>
            <p class="goods_info">
                {{data.wname}}
            </p>
            <p class="goods_bot"><span class="goods_price">￥{{data.jdPrice}}</span><span @click.stop="gotoCart" class="goods_car icon iconfont icon-gouwuche"><i>+</i></span></p>
        </dd>
    </dl>
    
</template>
<script>
import {getCookie} from '@/utils/cookie'
export default {
    props:['data'],
    data(){
        return {
            sum:0
        }
    },
    methods:{
        gotoDetail(){
            this.$router.push({
                name:'detail',
                query:this.data
            })
        },
        gotoCart(){//加入购物车
            this.sum++
            this.data['sum']=this.sum
            let token = getCookie('token');
            this.$http.post('/user/shopcar',{
                data:this.data,
                token
            }).then(res=>{
                if(res.data.code===0){
                    this.$router.push({
                        name:'login'
                    })
                    console.log('加入购物车失败,登录失效')
                } else if(res.data.code===1){
                    this.$msgBus.$emit('msg','加入购物车成功')//自己定义的插件中的bus事件
                }
            })
            this.$store.dispatch('fetchNum');//购物车数字加加
            
        }
    }
}
</script>
<style scoped>

dl{
    width:49%;
    height:5.5rem;
    margin:5px 0.5%;
    background:#fff;
}
dl dt{
    width:100%;
    height:3.5rem;
}
dl dt img{
    width:100%;
    height:100%;
}
dl dd{
    width:100%;
    height:2rem;
}
dl dd .goods_info{
    width:90%;
    height:1rem;
    text-indent: 10px;
    line-height: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
dl dd .goods_bot{
    width:100%;
    height:1rem;
    line-height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 10px;
    box-sizing: border-box;
}
.goods_price{
    color:red;
}
.goods_car{
    position: relative;
    width:.5rem;
    height:.5rem;
    line-height: .5rem;
    text-align: center;
}
.goods_car i{
    position: absolute;
    width:.2rem;
    height:.2rem;
    background: red;
    right:-.08rem;
    top:-.07rem;
    font-style: normal;
    text-align: center;
    line-height: .2rem;
    color:#fff;
    border-radius: 50%;
    font-size:.12rem;
}
</style>
