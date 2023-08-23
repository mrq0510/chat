<template>
    <div>
        <van-nav-bar style="width: 100vw;">
            <template #left>

                <span @click="open=!open" style="display: flex;align-items:center;gap:10px">
                    <menu-outlined />
                    <span>菜单</span>
                </span>
            </template>
            <template #title>
                <div> <span style="font-weight: 100;font-size:14px"> ChartGPT ( {{ titleC }} ) </span> </div>
            </template>
            <template #right>
                <span style="display: flex;align-items:center;gap:10px" @click="addModal=true">
                    <span>新建聊天</span>
                    <plus-outlined />
                </span>
            </template>
        </van-nav-bar>
        <router-view></router-view>
    </div>
    <Menus :open="open" @open="v=>open=v"></Menus>
    <a-modal title="新建聊天" @ok="addModalF" v-model:open="addModal">
        <label>
            <span>聊天组名称</span>
            <a-input v-model:value="newChartName"></a-input>
        </label>
    </a-modal>
</template>

<script setup>
import Menus from "@/mobile/components/Menus.vue"
import { MenuOutlined, PlusOutlined } from "@ant-design/icons-vue"
import { ref ,computed} from "vue";
import Chart from "@/api/chart.api.js"
import home from "@/store/index"
import {message} from 'ant-design-vue'
const open = ref(false)
const store = home()
store.mineChartMenus();


const titleC = computed(()=>{
    return store.menus.find(v=>store.chartKey.includes(v.new_chart_id))?.new_chart_name
})

const newChartName=ref('')
const addModal=ref(false);

const addModalF=async ()=>{
    let messageText = ''
    if(_.isEmpty(newChartName.value)){
        messageText='请输入聊天组'
    }else {
        let res =  await store.newChartGroup(newChartName.value)
        addModal.value=false
        messageText=`${res.new_chart_name} 已创建`
    }
    message.info(messageText);
    store.mineChartMenus();
}
</script>

<style lang="scss" scoped>

</style>