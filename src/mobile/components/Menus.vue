<template>
    <div>
        <a-drawer :bodyStyle="{ 
                padding: 0,
                display: 'flex',
                'flex-direction': 'column',
                'justify-content': 'space-between' 
            }" class="drawer" :closable="false" width="50%" :placement="'left'" :open="open"
            @close="onClose">
            <template #title>
                <span @click="openMenu = !openMenu" style="display: flex;align-items:center;gap:10px">
                    <menu-outlined />
                    <span>菜单</span>
                </span>
            </template>
            <a-menu style="border: 0;" v-model:selectedKeys="store.chartKey" mode="inline">
                <van-swipe-cell v-for="item in store.menus" :before-close="beforeClose(item)">
                    <template #right>
                        <van-button square type="danger" @click="deleteChartGroup(item)" text="删除" />
                    </template>
                    <a-menu-item :key="item.new_chart_id">
                        <template #icon>
                            <i class="iconfont icon-chat-line-round"></i>
                        </template>
                        <!-- {{ item.new_chart_name }} -->
                        <van-cell style="background-color:transparent;">

                            <template #title>
                                <div>
                                    {{ item.new_chart_name }}
                                </div>
                            </template>
                        </van-cell>

                    </a-menu-item>


                </van-swipe-cell>



            </a-menu>

            <div class="bottom">
                <a-list item-layout="horizontal" :data-source="[store.user]">
                    <template #renderItem="{ item }">
                        <a-list-item style="cursor: pointer;position:relative;">
                            <a-list-item-meta>
                                <template #avatar>
                                    <i class="iconfont icon-server" style="font-size: 2rem;"></i>
                                </template>
                                <template #description>
                                    <a-tooltip placement="top" :title="service.server">
                                        <span
                                            style="font-size: 14px;text-overflow: ellipsis;overflow: hidden;display:inline-block;width:100%;">
                                            {{ service.server }} </span>
                                    </a-tooltip>
                                </template>
                                <template #title>
                                    <span style="font-size: 16px;" v-show="!sliderIsOpen"> {{ service.name }} </span>
                                </template>
                            </a-list-item-meta>
                            <a-select @change="serverChange" v-model:value="SERCERS.active"
                                style="position: absolute;top:0;left:0;width:94%;height:100%;opacity:0" placement="topLeft">
                                <a-select-option :value="index" v-for="(it, index) in sercers.servers"> {{ it.name }}
                                </a-select-option>
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
        </a-drawer>
    </div>
</template>

<script setup>
import { withDefaults, defineProps, toRefs, defineEmits, computed, ref } from "vue";
import { MenuOutlined, AliwangwangOutlined, LoginOutlined } from "@ant-design/icons-vue";
import home from "@/store/index";
import Chart from "@/api/chart.api";
import { message } from "ant-design-vue"
const emit = defineEmits(['open'])
import { sercers } from "@/api/service";
import { useRouter } from "vue-router";
const store = home();
const router = useRouter();
const SERCERS = ref(sercers)
const props = defineProps({
    open: {
        type: Boolean,
        default: false
    },

})

const { open } = toRefs(props)

const service = computed(() => {
    return SERCERS.value.servers.find((v, index) => index === SERCERS.value.active) || {}
})

const serverChange = (value, option) => {
    loginout();
    store.setSERVERACTIVE(value)
}

console.log(props, open)

const onClose = () => {
    console.log('关闭');
    emit('open', false)
}

const beforeClose = (item) => {
    console.log(item);
}

const deleteChartGroup = async (item) => {
    try {
        await store.deleteChatGroup(item.new_chart_id);
        message.success('成功删除' + item.new_chart_name);
    } catch (error) {
        message.error(item.new_chart_name + '删除失败：' + error.message);
    }

}

const loginout = async () => {
    router.push('/login')
    let res = await store.loginout();
}


</script>

<style lang="scss" scoped>
.drawer {}


</style>