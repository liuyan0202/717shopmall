<template>
    <div class="search">
        <p class="search_top">
            <i class="search-icon icon iconfont icon-fangdajing"></i>
            <input type="text" placeholder="搜索你想找的商品" @blur="blurFn" v-model="msg">
            <span @click="cancel">取消</span>
        </p>
        <div class="recent_search">
            <p class="my_search"><span>最近搜索</span><i @click="deleteFn" class="search_delete">清空搜索纪录</i></p>
            <span class="search_info">{{info}}</span>
            <ul class="recent_list ul">
                <li v-for="(x,index) in my_list" :key="index">{{x}}</li>
            </ul>
        </div>
        <div class="search_hot">
            <p>大家都在搜</p>
            <ul class="hot_list ul">
                <li>蜂蜜</li>
                <li>口红</li>
                <li>红酒</li>
                <li>杯子</li>
                <li>电脑</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg:'',
            msgs:[],
            my_list:[],
            info:''
        }
    },
    methods:{
        blurFn(){
            this.msgs.push(this.msg)
            let arr = this.msgs
            localStorage.setItem('list',arr)
            this.my_list = arr;
            this.msg = ''
        },
        deleteFn(){
            localStorage.removeItem('list');
            this.my_list = [];
        },
        cancel(){
            this.$router.push({
                name:'home'
            })
        }
    },
    mounted(){
            if(localStorage.getItem('list')){
                this.my_list = localStorage.getItem('list').split(',');
            }
                
            if(this.my_list.length===0){
                this.info = '暂无搜索纪录'
            } else {
                this.info = ''
            }
    }
}
</script>
<style scoped>
.search{
    width:100%;
    height:100%;
    background: #fff;
}
.search_top{
    position: relative;
    box-sizing: border-box;
    width:100%;
    height:1rem;
    border-bottom:1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left:.6rem;
}
.search_top .search-icon{
    position: absolute;
    left:1rem;
}
.search_top span{
    width:1.4rem;
    text-align: center;
}
.search_top input{
    flex:1;
    height:.6rem;
    border:none;
    outline: none;
    text-indent: 1rem;
    border-radius: 10px;
    background: #eee;
}
.recent_search{
    width:100%;
}
.ul{
    width:100%;
    display: flex;
    flex-wrap: wrap;
}
.ul li{
    width:20%;
    height:.8rem;
    text-align: center;
    line-height: .8rem;
    border:1px solid #ccc;
    border-radius: 10px;
    margin:5px 2%;
}
.recent_search .my_search{
    padding:0 .5rem;
    box-sizing: border-box;
    width:100%;
    height:1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size:.36rem;
}
.recent_search .my_search span{
    height:1.4rem;
    line-height: 1.4rem;
}
.search_hot{
    width:100%;
}
.search_hot p{
    box-sizing: border-box;
    width:100%;
    height:1.4rem;
    padding:0 .5rem;
    font-size:.36rem;
    line-height: 1.4rem;
}
.search_info{
    display: inline-block;
    width:100%;
    text-align: center;
}
.search_delete{
    font-style:normal;
    font-size:.2rem;
}
</style>
