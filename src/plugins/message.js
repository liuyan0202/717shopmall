/* 
* @actionName Message
* 功能：消息提示框，可以自动隐藏
* msgBus 跨组件传值，bus 
* active 触发事件，传入提示信息
*/
import './message.css'
import Compmsg from './compmsg.vue'

let message = {
    install(Vue,options){
        const msgBus = new Vue({})
        Object.defineProperty(Vue.prototype,'$msgBus',{
            value:msgBus
        })
        Vue.component('Message',{
            template:`<div class="msgbox">
                        <transition-group name="message">
                            <Compmsg v-for="(x,index) in msg" :timeout="timeout" :key="index">{{x}}</Compmsg>
                        </transition-group>
                            </div>`,
            data(){
                return {
                    msg:[],
                    timeout:options.timeout
                }
            },
            methods:{
                active(msg,opt){
                    this.msg.push(msg)
                    if(opt){
                        this.timeout = opt.timeout
                    }
                }
            },
            mounted () {
                msgBus.$on('msg',(msg)=>{
                    this.active(msg)
                })
            },
            components:{
                Compmsg
            }
        })
    }
}
export default message