<template>
    <div class="listbox">
        <span :class="ischeck?'iconfont icon-checked listbox_left':'iconfont icon-unchecked listbox_left'" @click="ischeckfn(index)" v-show="show"></span>
        <dl>
            <dt>
                <img :src="list.imageurl" alt="">
            </dt>
            <dd>
                <h4>{{list.wname}}</h4>
                <div class="listbox_bot">
                    <div class="bot_left">
                        <span>X 1</span>
                        <span class="listbox_price">￥{{list.jdPrice}}</span>
                    </div>
                    <div class="bot_right">
                        <span class="minus iconfont icon-jian1" @click="add_minus('minus')"></span>
                        <span class="count">{{list.count}}</span>
                        <span class="add iconfont icon-jia1" @click="add_minus('add')"></span>
                    </div>
                </div>
            </dd>
        </dl>
    </div>
</template>
<script>
import bus from '@/utils/bus'
import { getCookie } from '@/utils/cookie'
export default {
    props:['list','index','show'],
    data(){
        return {
            ischeck:false
        }
    },
    methods:{
        ischeckfn(index){//点击选中
            this.ischeck = !this.ischeck;
            bus.$emit('goodsChecked',{
                name:this.list.wname,
                price:this.ischeck?this.list.count*this.list.jdPrice:0,
                data:this.list
            })
        },
        add_minus(val){//加减数量
            if(val === 'add'){
                if(this.list.count>=10)return
                this.list.count++;
            } else if(val === 'minus'){
                if(this.list.count<=1)return
                this.list.count--;
            }
            this.$http.post('/goods/changeNum',{//改变数量
                token: getCookie('token'),
                count: this.list.count,
                wname: this.list.wname
            }).then(res=>{
                if(res.data.code === 1){
                    bus.$emit('goodsChecked',{name:this.list.wname,price:this.ischeck?this.list.count*this.list.jdPrice:0})
                }
            })
        }
    },
    mounted(){
        this.count = this.list.count
        bus.$on('clickAll',(result)=>{//全选
            this.ischeck = result
            bus.$emit('goodsChecked',{
                name:this.list.wname,
                price:this.ischeck?this.list.count*this.list.jdPrice:0
            })
        })
        
    }
}
</script>
<style scoped>
.listbox{
    position: relative;
    width:100%;
    height:2.4rem;
    background: #fff;
    margin-bottom:12px;
    display: flex;
}
.listbox_left{
    width:40px;
    line-height: 2.4rem;
    text-align: center;
}
.listbox dl{
    flex:1;
    display: flex;
    padding:10px 10px 10px 0;
}
.listbox dl dt{
    width:2.2rem;
    height:100%;
    border:1px solid #ccc;
    margin-right:10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.listbox dl dt img{
    width:70%;
}
.listbox dl dd{
    flex:1;
    padding-right:10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.listbox dl dd h4{
    line-height:1.6;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.listbox dl dd .listbox_bot{
    display: flex;
    justify-content: space-between;
    height:.8rem;
}
.bot_left{
    display: flex;
    flex-direction: column;
}
.listbox_price{
    color:red;
}
.bot_right{
    height:100%;
    display: flex;
}
.bot_right .minus,.bot_right .add{
    width:.6rem;
    text-align: center;
    height:100%;
    border:1px solid #ccc;
    line-height: .8rem;
}
.bot_right .count{
    width:.8rem;
    text-align: center;
    height:100%;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    line-height: .8rem;
    font-size:.4rem;
}
.icon-unchecked,.icon-checked{
    font-size:.56rem;
    vertical-align: middle;
}
.icon-checked{
    color: red;
}

</style>
