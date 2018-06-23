<template>
    <div class="classify">
        <div class="classify_top">
            <p>
                <span class="iconfont icon-fangdajing"></span>
                <input type="text" placeholder="输入您要购买的商品">
            </p>
            <span class="iconfont icon-xiaoxi"></span>
        </div>
        <div class="classify_content">
            <ul class="classify_left">
                <li v-for="(x,index) in list" :key="index" :data-id="initNum+index" @click="getData($event,index)" :class="int===index?'active':''">{{x}}</li>
            </ul>
            <div class="classify_right">
                <div v-for="(x,index) in shoplist" :key="index" class="classify_box">
                    <p class="classify_title">{{x.goodsTypeName}}</p>
                    <div class="classify_dl">
                        <dl v-for="(item,ind) in x.goodsTypeList" :key="ind">
                            <dt>
                                <img :src="item.goodsTypeImgUrl" alt="">
                            </dt>
                            <dd>
                                {{item.goodsTypeName}}
                            </dd>

                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data(){
        return {
            list:['手机数码','电脑办公','电视影音','空调冰洗','厨房卫浴','生活电器','食品酒水','美妆个护','母婴玩具','医疗保健','服饰鞋帽','运动户外','箱包奢品','钟表首饰','住宅家具','家装建材','家居日用','床品家纺','汽车用品','黄金收藏','智能家居','金融理财','生活服务'],
            int:0,
            initNum:17951828,
            code:17951828
        }
    },
    computed:{
        shoplist(){
            return this.$store.state.classifylist[this.code]
        }  
    },
    methods:{
        getData(e,ind){
            let id = e.target.getAttribute('data-id');
            this.code = id;
            this.int = ind;
            this.$store.dispatch('fetchClassify',id);
        }
    },
    mounted(){
        /* this.$http.get('https://m.gome.com.cn/index.php?ctl=goods_class&act=ajaxGetClassList&cid=17951828').then(res=>{
            //console.log(res.data)
        }) */
        
        
    }
};
</script>
<style scoped>
.classify {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.classify .classify_top {
  box-sizing: border-box;
  width: 100%;
  height: 1rem;
  display: flex;
  padding-left: 1rem;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
.classify_top span {
  width: 1rem;
  text-align: center;
  height: 100%;
  line-height: 1rem;
}
.classify_top p {
  flex: 1;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
}
.classify_top p span {
  position: absolute;
  left: 0;
  top: 0;
}
.classify_top p input {
  width: 100%;
  height: 0.7rem;
  text-indent: 1rem;
  border: 0;
  background: #eee;
  border-radius: 5px;
}
.classify_content {
  width: 100%;
  flex:1;
  display: flex;
}
.classify_content .classify_left {
  flex: 0.3;
  overflow-y: scroll;
}
.classify_left li {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  box-sizing: border-box;
}
.classify_left li.active{
    background: #fff;
    color:red;
    border-left:2px solid red;
}
.classify_content .classify_right {
  flex: 0.7;
  background: #fff;
  overflow-y: scroll;
}
.classify_box{
    width:100%;
}
.classify_title{
    width:100%;
    height:.7rem;
    line-height: .7rem;
    text-indent:10px;
}
.classify_dl{
    width:100%;
    display: flex;
    flex-wrap: wrap;
}
.classify_dl dl{
    width:30%;
    margin:0 1%;
    background: #eee;
    height:2rem;
    margin-bottom:8px;
}
.classify_dl dl dt{
    width:100%;
    height:1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.classify_dl dl dt img{
    width:60%;
}
.classify_dl dl dd{
    width:100%;
    height:.6rem;
    line-height: .6rem;
    text-align: center;
}
</style>
