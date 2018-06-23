import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/pages/index/index'

import Login from '@/pages/login/login'

import Register from '@/pages/register/register'

import Search from '@/pages/search/search'

import Home from '@/pages/home/home.vue'

//import Classify from '@/pages/classify/classify.vue'
const Classify = ()=>import(/* webpackChunkName: "Classify" */ '@/pages/classify/classify.vue')//按需加载

import Shopcar from '@/pages/shopcar/shopcar.vue'

import Mine from '@/pages/mine/mine.vue'

import Orderpay from '@/pages/orderpay/orderpay.vue'//订单支付
import Goodsaddress from '@/pages/goodsaddress/goodsaddress.vue'//收货地址
import Newaddress from '@/pages/newaddress/newaddress.vue'//新增收货地址

import Detail from '@/pages/detail/detail.vue'//详情页
import DetailShop from '@/pages/detail_shop/detail_shop.vue'
import DetailAsk from '@/pages/detail_ask/detail_ask.vue'

import Myorder from '@/pages/myorder/myorder.vue'//我的订单
import OrderAll from '@/pages/order_all/order_all.vue'
import OrderNopay from '@/pages/order_nopay/order_nopay.vue'
import OrderNosend from '@/pages/order_nosend/order_nosend.vue'
import OrderNotake from '@/pages/order_notake/order_notake.vue'
import OrderAftersale from '@/pages/order_aftersale/order_aftersale.vue'
import { getCookie } from '../utils/cookie';
Vue.use(VueRouter)
let router=new VueRouter({
    mode:"history",
    routes:[
        {
            path:"/",
            redirect:'/index/home'
        },
        {
            name:'index',
            path:'/index',
            component:Index,
            children:[
                {
                    name:'home',
                    path:'home',
                    component:Home
                },
                {
                    name:'classify',
                    path:'classify',
                    component:Classify
                },
                {
                    name:'shopcar',
                    path:'shopcar',
                    component:Shopcar
                },
                {
                    name:'mine',
                    path:'mine',
                    component:Mine
                }
            ]
        },
        {
            name:'login',
            path:'/login',
            component:Login
        },
        {
            name:'register',
            path:'/register',
            component:Register
        },
        {
            name:'search',
            path:'/search',
            component:Search
        },
        {
            name:'detail',
            path:'/detail',
            component:Detail,
            redirect:'/detail/detail_shop',
            children:[
                {
                    name:'detail_shop',
                    path:'detail_shop',
                    component:DetailShop
                },
                {
                    name:'detail_ask',
                    path:'detail_ask',
                    component:DetailAsk
                }
            ]
        },
        {
            name:'orderpay',//订单支付
            path:'/orderpay',
            component:Orderpay
        },
        {
            name:'goodsaddress',//收货地址
            path:'/goodsaddress',
            component:Goodsaddress
        },
        {
            name:'newaddress',//新增收货地址
            path:'/newaddress',
            component:Newaddress
        },
        {
            name:'myorder',//我的订单
            path:'/myorder',
            component:Myorder,
            redirect:'/myorder/order_all',
            children:[
                {
                    name:'order_all',
                    path:'order_all',
                    component:OrderAll
                },
                {
                    name:'order_nopay',
                    path:'order_nopay',
                    component:OrderNopay
                },
                {
                    name:'order_nosend',
                    path:'order_nosend',
                    component:OrderNosend
                },
                {
                    name:'order_notake',
                    path:'order_notake',
                    component:OrderNotake
                },{
                    name:'order_aftersale',
                    path:'order_aftersale',
                    component:OrderAftersale
                }

            ]
        }
    ]
})
router.beforeEach((to,from,next)=>{
    if(to.name==='shopcar'||to.name==='mine'){
        let token = getCookie('token')
        if(!token){
            next({
                name:'login',
                query:{
                    from:to.name
                }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})
export default router