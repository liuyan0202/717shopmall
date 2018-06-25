<template>
    <div class="orderpay">
        <div class="order_head">
            <i class="iconfont icon-xaingzuo" @click="returnFn"></i>
            <span>订单支付</span>
            <i class="iconfont icon-xiaoxi"></i>
        </div>
        <div class="order_address">
            <div></div>
            <p @click="addAddress">
                <span class="iconfont icon-dizhi"></span>
                <span>请添加您的收货地址</span>
                <span class="iconfont icon-xiangyou nextRight"></span>
            </p>
        </div>
        <div class="order_img">
            <img src="./../../static/img/orderpay/1.jpg" alt="">
        </div>
        <div class="datalist">
            <Shopgoods v-for="(item,index) in buylist" :list="item" :index="index" :key="index" :show="false" :par="true"></Shopgoods>
            <div class="order_total">
                <span>总额(含运费)</span>
                <span class="totals">￥{{totals}}</span>
            </div>
            <div class="payway"></div>
        </div>
        <div class="order_footer">
            <span class="order_price">
                <i class="totalone">总计：￥{{totals}}</i>
                <i>(含运费)</i>
            </span>
            <button class="submitOrder">提交订单</button>
        </div>
    </div>
</template>
<script>
import Shopgoods from './../shopcar/shopgoods.vue'
import {getCookie} from '@/utils/cookie'
import bus from '@/utils/bus'
export default {
    data(){
        return {
            buylist:[],
            totals:0,
            list:{}
        }
    },
    methods:{
        returnFn(){
            this.$router.push({
                name:'shopcar'
            })
            this.$http.post('/clearBuylist',{
                token:getCookie('token')
            }).then(res=>{
                console.log(res.data)
            })
        },
        addAddress(){
            this.$router.push({
                name:'goodsaddress'
            })
        }
    },
    created(){
    },
    mounted(){
        this.$http.post('/getbuygoods',{
            token:getCookie('token')
        }).then(res=>{
            if(res.data.code===1){
                this.buylist = res.data.buylist;
                res.data.buylist.forEach(v=>{
                    this.totals += v.count*v.jdPrice
                })
                bus.$on('goodsChecked',(data)=>{
                    this.list[data.name] = data.price
                    let total = Object.values(this.list).reduce((init,item)=>{
                        return init+item
                    },0)
                    console.log(total)
                })
                //console.log(this.totals)
            }
        })
    },
    components:{
        Shopgoods
    }
}
</script>
<style scoped>
.orderpay{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
}
.orderpay .order_head{
    width:100%;
    height:1rem;
    display: flex;
    align-items: center;
    border-bottom:1px solid #ccc;
}
.order_head i{
    width:.8rem;
    text-align: center;
}
.order_head span{
    flex:1;
    text-align: center;
}
.order_address{
    position: relative;;
    width:100%;
    height:2rem;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:0 15px;
    box-sizing: border-box;
}
.nextRight{
    position: absolute;
    right:10px;
}
.order_img{
    width:100%;
    height:.3rem;
    margin-bottom:10px;
}
.order_img img{
    height:100%;
}
.datalist{
    width:100%;
    flex:1;
    overflow-y: scroll;
    padding-left:15px;
    box-sizing: border-box;
}
.order_total{
    width:100%;
    height:.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right:15px;
    box-sizing: border-box;
    background: #fff;
}
.order_total .totals{
    color:red;
}
.order_footer{
    width:100%;
    height:1rem;
    background: #fff;
    border-top:1px solid #ccc;
    display: flex;
}
.order_price{
    flex:1;
    text-align: right;
    margin-right:10px;
}
.order_price i{
    display: block;
    font-style: normal;
}
.totalone{
    color:red;
    font-size:.36rem;
    line-height: .5rem;
}
.submitOrder{
    width:2rem;
    background: red;
    color:#fff;
    outline: none;
    border:0;
}
</style>
