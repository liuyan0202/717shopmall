<template>
    <div class="addBox">
        <header class="header">
            <i class="icon iconfont icon-xaingzuo" @click="backFn"></i>
            <span>收货人</span>
            <span></span>
        </header>
        <div class="infor">
            <p><input type="text" placeholder="收货人姓名" v-model="name"></p>
            <p><input type="text" placeholder="手机号" v-model="phone"></p>
            <div class="selectbox">
                <div class="slect_adr">
                    <div>
                        <multiselect v-model="province" @select="provChange" :options="provlist" placeholder="请选择省" label="name"></multiselect>
                    </div>
                    <div>
                        <multiselect v-model="city" @select="cityChange" :options="citylist" placeholder="请选择市" label="name"></multiselect>
                    </div>
                </div>
                <div class="area_adr">
                    <multiselect v-model="area" :options="arealist" placeholder="请选择区"></multiselect>
                </div>
            </div>
            <!-- <p class="pick">
                <select name="" id="province">
                    <option value="北京">北京</option>
                    <option value="浙江">浙江</option>
                    <option value="广东">广东</option>
                </select>
                <select name="" id="city">
                    <option value="北京">北京</option>
                    <option value="杭州">杭州</option>
                    <option value="广州">广州</option>
                </select>
            </p>
            <p class="area">
                <select name="" id="areas">
                    <option value="海淀区">海淀区</option>
                    <option value="大兴">大兴</option>                    
                    <option value="朝阳区">朝阳区</option>
                    <option value="通州">通州</option>
                </select>
            </p> -->
            <p><input type="text" name="" id="" placeholder="详细地址" v-model="detailAddress"></p>
            <div><span :class="flag?'iconfont icon-checked':'iconfont icon-unchecked'" @click="ischecked"></span><span>设为默认地址</span></div>
            <button class="save" @click="save">保存</button>
        </div>
        <Message></Message>
    </div>

</template>
<script>
import Multiselect from 'vue-multiselect'
import { getCookie } from '@/utils/cookie'
import "vue-multiselect/dist/vue-multiselect.min.css"//第三方select
import { axiosInstance } from '@/utils/request'
import axios from 'axios'
export default {
    data(){
        return {
            flag:false,
            province:'',
            city:'',
            area:'',
            provlist:[],
            citylist:[],
            arealist:[],
            info:{},
            name:'',
            phone:'',
            detailAddress:''
        }
    },
    methods: {
        backFn() {
            this.$router.push("/goodsaddress");
        },
        ischecked(){
            this.flag = !this.flag
        },
        provChange(option){
            this.citylist = option.city;
            this.city = '';
            this.area = '';
        },
        cityChange(option){
            this.arealist = option.area
        },
        save(){
            //省
            let myprovince = this.province.name;
            //市
            let mycity = this.city.name;
            //区
            let myarea = this.area;

            if(!this.name||this.myprovince||this.mycity||this.myarea){
                this.$msgBus.$emit('msg','请填写完整信息')
                return
            }
            let reg = /^1[3578]\d{9}$/;
            if(!reg.test(this.phone)){
                alert('请填写正确的手机号')
                return
            }
            let obj = {
                name:this.name,
                phone:this.phone,
                province:myprovince,
                city:mycity,
                area:myarea,
                detailAddress:this.detailAddress
            }
            this.$http.post('/newAddress',{
                token:getCookie('token'),
                obj:obj
            }).then(res=>{
                if(res.data.code === 1){
                    this.$router.push({
                        name:'goodsaddress'
                    })
                }
            })
        }
    },
    created(){
        let {type,name,phone,province,city,area,detailAddress} = this.$route.query;
        console.log(decodeURI(province),city)
        if(type === 'edit'){
            this.name = name;
            this.phone = phone;
            this.province = {name:decodeURI(province)};
            this.city = {name:city};
            this.area = area;
            this.detailAddress = detailAddress;
        }
        axiosInstance.get('/src/server/city/city.json').then(res=>{
            this.provlist = res.data
        })
    },
    components: { Multiselect }
}
</script>
<style scoped>
.addBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.header {
    height: 1rem;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #ccc;
}
.infor {
    box-sizing: border-box;
    padding: 10px;
    flex: 1;
}
.infor p {
    width:100%;
    height: 1rem;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom:10px;
}
.infor p input {
    background: #fff;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    text-indent: 1em;
}
.multiselect{
    color:#666;
}
.selectbox{
    width:100%;
}
.selectbox .slect_adr{
    width:100%;
    display: flex;
    justify-content: space-between;
}
.slect_adr div{
    flex:1;
}
.area_adr{
    margin:10px 0;
}
/* .pick{
    display: flex;
    justify-content: space-between;
}
.pick select{
    width:40%;
    border:none;
}
.area select{
    width:100%;
    height: 100%;
    border:none;
    outline: none;
}
.area select option{
     width:100%;
} */
.save{
    width:80%;
    height:1rem;
    margin: 25px 0 0 10%;
    background: red;
    color:#fff;
    border-radius: 1rem;
    border:0;
    outline: none;
}
.icon-unchecked,.icon-checked{
    font-size:.56rem;
    vertical-align: middle;
}
.icon-checked{
    color: red;
}
</style>



