

<template>
<div >
  <router-view></router-view>
</div>
</template>
<script setup>
import home from "@/store/index";

const store = home();

if(store.user._id){
  store.login({username:store.user.username,password:store.user.password})
}else{
  store.user={}
}

</script>
<style>

html,body{
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}


</style>
