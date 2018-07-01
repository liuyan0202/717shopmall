import Vue from 'vue'
import axios from 'axios'

const testUrl = 'http://192.168.191.1:3000'
const onlineUrl = 'http://192.168.191.1:3000' || 'https://m.jd.com'
let httpInstance = axios.create({
    header:{
        'Content-Type':'application/json'
    },
    baseURL:process.env.NODE_ENV==='production'?onlineUrl:testUrl
})

axios.interceptors.request.use((config)=>{
    return config
},(err)=>{
    return Promise.reject(err)
})

axios.interceptors.response.use((response)=>{
    if(response.status === 200){
    } else {
        return response.data
    }
},(err)=>{
    return Promise.reject(err)
})
let axiosInstance = axios.create({})//相当于使用axios
export {httpInstance,axiosInstance}
export default {
    install(Vue){
        Object.defineProperty(Vue.prototype,'$http',{
            value:httpInstance
        })
    }
}