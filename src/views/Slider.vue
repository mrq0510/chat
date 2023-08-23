<template>
    <div class="slider" :class="{'slider-active':sliderIsOpen}">
        <div class="s_top">
            <a-button class="add_chart" @click="openAddModal" :icon="h(PlusOutlined)">新建聊天 </a-button>
            <div class="act" @click="openSilder">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
            </div>
        </div>
        <a-menu
            style="border:0"
            v-model:selectedKeys="store.chartKey"
            mode="inline"
            :inline-collapsed="sliderIsOpen"
        >
            <a-menu-item @contextmenu="($event) => { onContextMenu(item, $event) }" v-for="item in store.menus" :key="item.new_chart_id">
                <template #icon>
                    <i class="iconfont icon-chat-line-round"></i>
                </template>
                {{ item.new_chart_name }}
            </a-menu-item>
        </a-menu>
        <div class="bottom">
            <a-list item-layout="horizontal" :data-source="[store.user]">
                <template #renderItem="{ item }">
                    <a-list-item style="cursor: pointer;position:relative;">
                        <a-list-item-meta >
                            <template #avatar>
                                <i class="iconfont icon-server" style="font-size: 2rem;"></i>
                            </template>
                            <template #description>
                                <a-tooltip placement="top" :title="service.server">
                                    <span style="font-size: 14px;text-overflow: ellipsis;overflow: hidden;display:inline-block;width:100%;"> {{ service.server }} </span>
                                </a-tooltip>
                            </template>
                            <template #title>
                                <span style="font-size: 16px;" v-show="!sliderIsOpen"> {{ service.name }} </span>
                            </template>
                        </a-list-item-meta>
                        <a-select @change="serverChange" v-model:value="SERCERS.active" style="position: absolute;top:0;left:0;width:94%;height:100%;opacity:0" placement="topLeft">
                            <a-select-option :value="index" v-for="(it,index) in sercers.servers"> {{ it.name }} </a-select-option>
                        </a-select>
                    </a-list-item>
                    <a-list-item>
                        <template #actions>
                            <a-button title="退出登录" @click="loginout">
                                <template #icon>
                                    <LoginOutlined />
                                </template>
                            </a-button>
                        </template>
                      <a-list-item-meta>
                        <template #title>
                            {{ item.username }}
                        </template>
                        <template #avatar>
                            <a-avatar size="large" :src="item.avatar" />
                        </template>
                      </a-list-item-meta>
                    </a-list-item>
                  </template>
            </a-list>
        </div>
    </div>
    <a-modal title="新建聊天" @ok="addModalF" v-model:open="addModal">
        <label>
            <span>聊天组名称</span>
            <a-input v-model:value="newChartName"></a-input>
        </label>
    </a-modal>
</template>

<script setup>
import { h , ref , nextTick , onMounted,defineExpose, computed, watch} from 'vue';
import {PlusOutlined,AliwangwangOutlined,LoginOutlined} from "@ant-design/icons-vue"
import ContextMenu from '@imengyu/vue3-context-menu'
import home from "@/store/index.js";
import {message} from "ant-design-vue";
import Chart from "@/api/chart.api.js"
import {useRouter} from "vue-router"
import {sercers} from "@/api/service"

const SERCERS = ref(sercers)
const store = home();

const router = useRouter();

const service = computed(()=>{
    return SERCERS.value.servers.find((v,index)=>index===SERCERS.value.active) || {}
})

const serverChange=(value,option)=>{
    loginout();
    store.setSERVERACTIVE(value)
}


const  sliderIsOpen = ref(false); 

const openSilder = ()=>{
    sliderIsOpen.value=!sliderIsOpen.value
    document.querySelector('.frame').style.width =  `calc(100vw - ${!sliderIsOpen.value?'16.25rem':'5rem'}`
}

const addModal=ref(false)
const openAddModal = ()=>{
    addModal.value=true;
}
const newChartName=ref('')
const addModalF=async ()=>{
    let messageText = ''
    if(_.isEmpty(newChartName.value)){
        messageText='请输入聊天组'
    }else {
        let res =  await store.newChartGroup(newChartName.value)
        store.chartKey=[res.new_chart_id]
        addModal.value=false
        messageText=`${res.new_chart_name} 已创建`;

    }
    message.info(messageText);
    store.mineChartMenus();
}

//右键弹框
const onContextMenu = (item, $event) => {
    $event.preventDefault();
    ContextMenu.showContextMenu({
        x: $event.x,
        y: $event.y,
        theme: 'mac dark',
        items: [
            {
                label: "删除",
                icon: `iconfont icon-delete`,
                onClick: async () => {
                    await store.deleteChatGroup(item.new_chart_id)
                }
            }
        ]
    })
}

const loginout=async ()=>{
    router.push('/login')
    let res = await store.loginout();
}

defineExpose({
    openAddModal
})
</script>

<style lang="scss" scoped>
.slider{
    width: 16.25rem;
    padding: 8px;
    box-shadow: 3px 0 10px -5px rgba(0,0,0,.3);
    transition: all .5s;
    position: relative;
}
.s_top{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;


    .act{
        width: 2.75rem;
        height: 2.75rem;
        border-radius: 0.75rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgb(93 85 85 / 57%);
        cursor: pointer;
        transition: all .5s;
    }

    .act:hover{
        color: #40a9ff;
    }

    .add_chart{
        height: 2.75rem;
        width: calc(100% - 10px - 2.75rem);
        border-radius: 0.75rem;
        border:1px solid rgb(93 85 85 / 57%);
        display: flex;
        align-items: center;
        overflow: hidden;
    }
}

.bottom{
    position: absolute;
    bottom: 10px;
    width: 100%;
}
</style>

<style lang="scss" scoped>
    .slider-active{
        width: 5rem;
        padding: 8px;
        box-sizing: content-box;
        box-shadow: none;

        .add_chart{
            display: none;
        }
        .act{
            margin: 0 auto;
        }

        ::v-deep .ant-list-item-meta-content{
            opacity: 0;
        }
    }

    ::v-deep .ant-list-item-meta-content{
        align-self: center;

        .ant-list-item-meta-title{
            margin-bottom: 0!important;
            font-size: 20px!important;
        }
    }



    ::v-deep .ant-select-selector{
        height: 100%!important;
    }
</style>