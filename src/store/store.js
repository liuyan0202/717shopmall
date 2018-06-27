import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from '@/utils/jsonp'
import {httpInstance} from '@/utils/request'
import {getCookie} from '@/utils/cookie'
import router from '@/router/router'
Vue.use(Vuex)
let store = new Vuex.Store({
    state:{
        iconlist:[
            {
                icon:'icon-meishi',
                txt:'家乡味道'
            },
            {
                icon:'icon-chuan',
                txt:'进口食品'
            },
            {
                icon:'icon-niunai',
                txt:'牛奶乳品'
            },
            {
                icon:'icon-chabei',
                txt:'茶果冲饮'
            },
            {
                icon:'icon-shutiao',
                txt:'休闲零食'
            },
            {
                icon:'icon-wheat__easyic',
                txt:'米面粮油'
            },
            {
                icon:'icon-yinliao',
                txt:'调味调料'
            },
            {
                icon:'icon-jiubei',
                txt:'酒水饮料'
            }
        ],
        classifylist:{},
        num:null,
        goodslist:[]
    },
    mutations:{
        updateClassify(state,payload){
            state.classifylist[payload.id] = payload.data.secondLevelCategories;
        },
        updateNum(state,payload){
            state.num = payload
        },
        updateGoods(state,payload){
            state.goodslist = payload
        }
    },
    actions:{
        fetchClassify({commit},cid){//商品列表数据
            httpInstance.get(`/index.php?cid=${cid}`).then(res=>{
            commit('updateClassify',{
                id:cid,
                data:res.data
            })
            })
        },
        fetchNum({commit,state}){//购物车显示数量
            state.num++;
            commit('updateNum',state.num)
        },
        fetchGoods({commit,state},opt){//获取购物车商品列表
            httpInstance.post('/goodslist',{
                token:getCookie('token')
            }).then(res=>{
                if(res.data.code===0){
                    router.push({
                        name:'login',
                        query:{
                            from:this.$route.query.from
                        }
                    })
                } else {
                    state.num = null
                    commit('updateGoods',res.data.usergoods)
                }
            })
        }
    }
})
store.subscribe(()=>{
    //console.log(store.state.classifylist)
})
export default store