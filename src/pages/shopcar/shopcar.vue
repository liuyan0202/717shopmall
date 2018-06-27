<template>
    <div class="shopcar">
        <div class="header">
            <span class="iconfont icon-xaingzuo" @click="returnFn"></span>
            <p>购物车</p>
            <span><i @click="changeFn">{{txtedit}}</i><b class="iconfont icon-xiaoxi"></b></span>
        </div>
        <div class="section">
            <div v-show="$store.state.goodslist.length===0">
                购物车里什么都没有哦
            </div>
            <Shopgoods v-for="(item,index) in $store.state.goodslist" :list="item" :index="index" :key="index" :show="true" :par="false"></Shopgoods>
        </div>
        <div class="footer">
            <span><i :class="ischecked?'iconfont icon-checked':'iconfont icon-unchecked'" @click="checkfn"></i><b>全选</b></span>
            <div class="total">合计:<span>￥{{total}}</span></div>
            <button class="remove" @click="totalRemove">{{totaldel}}</button>
        </div>
        <Message ref="msg"></Message>
    </div>
</template>
<script>
import Shopgoods from './shopgoods'
import bus from '@/utils/bus'
import {getCookie} from '@/utils/cookie'
export default {
    data(){
        return {
            ischecked:false,
            total:0,
            list:{},
            txtedit:'编辑',
            totaldel:'结算',
            goodsList:[],
            datalist:[]
        }
    },
    methods:{
        checkfn(){//全选按钮
            this.ischecked = !this.ischecked;
            bus.$emit('clickAll',this.ischecked)//全选
        },
        returnFn(){//返回按钮
            this.$router.push({
                name:'home'
            })
        },
        getTotal(){//计算总价
            this.total = Object.values(this.list).reduce((init,item)=>{
                return init+item
            },0)
        },
        changeFn(){//点击编辑
            if(this.txtedit === '编辑'){
                this.txtedit = '完成'
                this.totaldel = '删除'
            } else {
                this.txtedit = '编辑'
                this.totaldel = '结算'
            }
        },
        totalRemove(){
            if(this.txtedit === '完成'){
                if(this.totaldel === '结算'){
                if(this.datalist.length>0){
                    this.$http.post('/buygoods',{//购买商品
                        token:getCookie('token'),
                        goodsdata:this.datalist,
                    }).then(res=>{
                       if(res.data.code===1){
                           this.$router.push({
                               name:'orderpay',
                               query:{
                                   from:'shopcar'
                               }
                           })
                       }
                    })
                }else {
                    this.$msgBus.$emit('msg','您还没有选中商品');
                }
            }
            }
            
            if(this.txtedit === '编辑'){
                if(this.totaldel === '删除') {
                if(confirm('您确定要删除吗？')){
                    this.$http.post('/goodsdel',{
                        token:getCookie('token'),
                        name:Object.keys(this.list)
                    }).then(res=>{
                        if(res.data.code===1){
                            this.$store.dispatch('fetchGoods');//数据列表
                            this.$msgBus.$emit('msg','删除成功');
                            bus.$emit('clickAll',false)//全选
                        }
                    })
                }
            }
            }
        }
    },
    created(){
        this.$store.dispatch('fetchGoods');//数据列表
    },
    mounted(){
        bus.$on('goodsChecked',(data)=>{//每个被选中
            this.list[data.name] = data.price
            this.getTotal()
            //遍历this.datalist去重
            if(data.ischeck){
                if(this.datalist.length>0){
                    this.datalist.forEach((v,i)=>{
                        if(v.wname===data.data.wname){
                            this.datalist.splice(i,1)
                        }
                    })
                }
                this.datalist.push(data.data)//为true添加进去
            } else {
                this.datalist.splice(data.index,1)
            }
        })
    },
    components:{
        Shopgoods
    }
}
</script>
<style scoped>
.shopcar{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
}
.shopcar .header{
    width:100%;
    height:1rem;
    border-bottom:1px solid #ccc;
    display: flex;
}
.shopcar .header span{
    width:1.6rem;
    height:1rem;
    line-height: 1rem;
    text-align: center;
}
.shopcar .header span i{
    font-style:normal;
    font-size:.3rem;
    margin-right:10px;
}
.shopcar .header p{
    flex:1;
    text-align: center;
    height:1rem;
    line-height: 1rem;
    font-size:.4rem;
}
.shopcar .section{
    flex:1;
    overflow-y:scroll;
}
.shopcar .footer{
    width:100%;
    height:1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top:1px solid #ccc;
    background: #fff;
}
.shopcar .footer span{
    margin-left:10px;
    display: flex;
}
.shopcar .footer span b{
    font-size:.38rem;
    margin-left:8px;
}
.shopcar .footer .remove{
    width:2rem;
    background: rgb(241, 49, 49);
    height:100%;
    color:#fff;
    border:0;
    outline: none;
    font-size:.4rem;
}
.total{
    height:100%;
    display: flex;
    font-size:.38rem;
    align-items: center;
}
.total span{
    color:red;
}
.icon-unchecked,.icon-checked{
    font-size:.56rem;
    vertical-align: middle;
}
.icon-checked{
    color: red;
}
</style>
