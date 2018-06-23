<template>
    <div class="message" v-show="isactive"><slot></slot></div>
</template>
<script>
export default {
    props:['timeout'],
    data(){
        return {
            isactive:false
        }
    },
    mounted(){
        this.isactive = true;
        setTimeout(()=>{
            this.isactive = false;
        },this.timeout)
    }
}
</script>
<style scoped>

</style>
