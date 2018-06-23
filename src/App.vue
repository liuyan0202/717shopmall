<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  #app{
    width:100%;
    height:100%;
    font-size:.3rem;
    background:#fafafb;
    color:#484848;
  }
  b,h1,h2,h3,h4{
    font-weight: normal;
  }
  .iconfont{
    font-size:.4rem;
  }
</style>
