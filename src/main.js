import Vue from 'vue'
import App from './App.vue'
import '@/static/font/iconfont.css'
import router from './router/router'
import store from './store/store'
import http from '@/utils/request'
import './assets/resetcss.css'//重置样式
import VueLazyload from 'vue-lazyload'//懒加载

//引用自定义插件，消息提示框
import Message from '@/plugins/message'
Vue.use(Message,{
  timeout:2000
})

Vue.use(VueLazyload, {//懒加载
  loading: '/src/static/img/home/loading.gif',
})

Vue.use(http)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
