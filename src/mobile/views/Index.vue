<template>
    <div class="content" >
        <Home></Home>
    </div>
</template>

<script setup>
import Home from "@/views/Home.vue"
</script>

<style lang="scss" scoped>
.content{
    height: calc(100vh - 46px);
    overflow: auto;
}
.content::-webkit-scrollbar{
    display: none;
}
</style>