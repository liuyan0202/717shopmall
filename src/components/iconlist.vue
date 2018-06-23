<template>
    <div class="home_iconlist">
        <span v-for="(x,index) in $store.state.iconlist" :key="index">
            <i :class="'icon iconfont '+x.icon"></i>
            <b>{{x.txt}}</b>
        </span>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.home_iconlist{
    background: #fff;
    height:2.9rem;
    margin-top:10px;
    display: flex;
    flex-wrap:wrap;
}
.home_iconlist span{
    width:25%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.home_iconlist span i{
    font-size:.5rem;
    width:.9rem;
    height:.9rem;
    background:#f8c986;
    text-align: center;
    line-height: .9rem;
    border-radius: 50%;
    color:#fff;
}
.home_iconlist span:nth-child(2) i{
    background:#ad56f1;
}

.home_iconlist span:nth-child(3) i{
    background:#ffde00;
}

.home_iconlist span:nth-child(4) i{
    background:#70bf00;
}

.home_iconlist span:nth-child(5) i{
    background:#f65c38;
}

.home_iconlist span:nth-child(6) i{
    background:#ffc62c;
}

.home_iconlist span:nth-child(7) i{
    background:#ffb139;
}

.home_iconlist span:nth-child(8) i{
    background:#6962fc;
}
</style>
