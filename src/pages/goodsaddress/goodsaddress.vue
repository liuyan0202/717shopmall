<template>
<!--收货地址-->
    <div class="goodsBox">
        <header class="header">
            <i class="icon iconfont icon-xaingzuo" @click="backFn"></i>
            <span>收货地址</span>
            <span></span>
        </header>
        <div class="addressbox">
            <div v-show="show" class="show">您还没有添加地址哦，请先添加</div>
            <div class="infoBox" v-for="(x,ind) in addresslist" :key="ind">
                <div  @click="pickFn(x)">
                    <p class="userinfo">
                        <span>{{x.name}}</span>
                        <span>{{x.phone}}</span>
                    </p>
                    <p class="detail_address"><i class="iconfont icon-dizhi"></i>{{x.province+''+x.city+''+x.detailAddress}}</p>
                </div>
                <div class="defult">
                    <aside>
                        <span :class="ind===int?'iconfont icon-checked':'iconfont icon-unchecked'" @click="ischecked(ind)"></span>
                        <span>默认地址</span>
                    </aside>
                    <aside>
                        <span @click="editFn(x,ind)">编辑</span>
                        <span @click="deleteFn(ind)">删除</span>
                    </aside>
                </div>
            </div>
        </div>
        <div class="footer_add">
            <button class="addFooter" @click="newAdd"><i class="iconfont icon-jia"></i>新增地址</button>
        </div>
    </div>
</template>
<script>
import { getCookie } from '@/utils/cookie'
export default {
    data(){
        return {
            show:false,
            addresslist:[],
            int:null
        }
    },
    methods:{
        backFn(){
            console.log(this.$route.query.from)
            this.$router.push({name:this.$route.query.from})
        },
        editFn(data,index){
            this.$router.push({
                name:'newaddress',
                query:{
                    type:'edit',
                    index:index,
                    name:data.name,
                    phone:data.phone,
                    province:encodeURI(data.province),
                    city:data.city,
                    area:data.area,
                    detailAddress:data.detailAddress
                }
            })
        },
        newAdd(){

            this.$router.push({
                name:"newaddress",
                query:{
                    type:'add',
                    from:this.$route.query.from
                }
            })
        },
        ischecked(index){
            this.int = index
            this.$http.post('/addr/default',{
                token:getCookie('token'),
                int:this.int
            })
        },
        deleteFn(index){
            if(confirm('您确定要删除吗？')){
                this.$http.post('/addr/delete',{
                    token:getCookie('token'),
                    index
                }).then(res=>{
                    if(res.data.code === 1){
                        this.addresslist = res.data.addresslist
                    }
                })
            }
        },
        pickFn(x){
            let address = x.province+''+x.city+''+x.detailAddress;
            if(this.$route.query.from === 'orderpay'){
                this.$router.push({
                    name:'orderpay',
                    query:{
                        from:'goodsaddress',
                        name:x.name,
                        phone:x.phone,
                        address
                    }
                })
            }
        }
    },
    created(){
        
    },
    mounted(){
        this.$http.post('/getaddress',{
            token:getCookie('token')
        }).then(res=>{
            if(res.data.code === 0){
                this.show = true
            } else {
                this.addresslist = res.data.addresslist
                res.data.addresslist.map((v,i)=>{
                    if(v.ischecked){
                        this.int = i
                    }
                })
            }
        })
    }
}
</script>
<style scoped>
.goodsBox{
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.header {
  height: 1rem;
  align-items: center;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid #ccc;
}
.addressbox{
    flex:1;
    overflow-y: scroll;
}
.infoBox{
    background: #fff;
    margin-bottom:10px;
    padding:0 15px;
    box-sizing: border-box;
}
.userinfo{
    width:100%;
    height:1rem;
    display: flex;
    align-items: center;
}
.userinfo span{
    margin-right:10px;
}
.detail_address{
    width:100%;
    line-height: .6rem;
    border-bottom:1px solid #ccc;
    color:#666;
}
.defult{
    width:100%;
    display: flex;
    height:1rem;
    justify-content: space-between;
    align-items: center;
}
.icon-unchecked,.icon-checked{
    font-size:.56rem;
    vertical-align: middle;
}
.icon-checked{
    color: red;
}

.footer_add{
    position: relative;
    height:2rem;
}
.addFooter{
    position: absolute;
    left:10%;
    bottom:1rem;
    width:80%;
    height:1rem;
    background: red;
    color:#fff;
    border-radius: 1rem;
    border:0;
    outline: none;
    font-size:.4rem;
}
.icon-dizhi{
    margin-right:10px;
}
.show{
    width:100%;
    height:2rem;
    text-align: center;
    line-height: 2rem;
}
</style>



