import Vue from 'vue'
import axios from 'axios'

let httpInstance = axios.create({
    header:{
        'Content-Type':'application/json'
    },
    baseURL:'http://localhost:3000'
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
        return response
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