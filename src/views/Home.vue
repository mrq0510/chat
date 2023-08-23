<template>
    <div class="frame" :style="isMobile?{width:'100vw'}:null">
        <div class="container">
            <div class="main">
                <div class="ms" v-for="item in chartsData" :key="item">
                    
                        <div class="chart title_right" v-if="item.role === 'user'">
                            <div class="icon">
                                <span class="time"> {{ item.createdAt }} </span>
                                <span class="name">User </span>
                            </div>
                            <div class="content">
                                <div style="max-width: calc(100% - 40px);">
                                    <van-popover class="pop" v-show="item.showPopover" placement="top" theme="dark">
                                        <template #default>
                                            <van-grid
                                                square
                                                clickable
                                                :border="false"
                                                column-num="3"
                                                style="width: 240px;"
                                            >
                                                <van-grid-item class="grid-item" icon-color="black" text="复制" icon="https://e3kkst.us.aircodecdn.com/copy.1691747613765_m09nyo7fdbq.png" @click="copy(item);"/>
                                                <van-grid-item class="grid-item" icon-color="black" text="删除" icon="https://e3kkst.us.aircodecdn.com/delete.1691747635523_48ah11cf9mb.png" @click="item.showPopover = false"/>
                                                <van-grid-item class="grid-item" icon-color="black" text="收藏" icon="https://e3kkst.us.aircodecdn.com/collection.1691747645860_jc0sv9co2ec.png" @click="item.showPopover = false"/>
                                            </van-grid>
                                        </template>
                                        <template #reference>
                                            <p class="pop_t" @click="item.showPopover=true" @contextmenu="($event) => { onContextMenu(item, $event) }" v-html="item.content"></p>
                                        </template>
                                    </van-popover>
                                </div>
                                <svg t="1688460336743" class="icon avatar" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="1295" width="30" height="30">
                                    <path
                                        d="M815.616 0H208.384C93.3 0 0 94.068 0 210.083v603.834C0 929.955 93.3 1024 208.384 1024h607.232C930.7 1024 1024 929.955 1024 813.917V210.083C1024 94.068 930.7 0 815.616 0z"
                                        fill="#13227a" p-id="1296"></path>
                                    <path
                                        d="M757.364 460.032A142.825 142.825 0 0 0 745.1 342.807a144.407 144.407 0 0 0-155.462-69.26 142.708 142.708 0 0 0-106.729-47.988h-1.257a144.384 144.384 0 0 0-137.355 99.933 142.755 142.755 0 0 0-95.418 69.237 144.43 144.43 0 0 0 17.757 169.262 142.825 142.825 0 0 0 12.241 117.202 144.384 144.384 0 0 0 155.462 69.26A142.755 142.755 0 0 0 541.09 798.44h1.28a144.337 144.337 0 0 0 137.356-100.003 142.732 142.732 0 0 0 95.418-69.237 144.198 144.198 0 0 0-17.78-169.192zM542.022 760.995h-0.163a107.148 107.148 0 0 1-68.562-24.855 69.857 69.857 0 0 0 3.375-1.932l114.06-65.862a18.548 18.548 0 0 0 9.379-16.128v-160.93l48.22 27.833a1.722 1.722 0 0 1 0.932 1.327v133.19a107.497 107.497 0 0 1-107.241 107.357z m-230.68-98.514a107.148 107.148 0 0 1-12.8-71.936l3.398 2.002 114.037 65.885a18.595 18.595 0 0 0 18.758 0l139.264-80.407v55.784a1.745 1.745 0 0 1-0.699 1.374l-115.293 66.56a107.567 107.567 0 0 1-107.334 0 107.497 107.497 0 0 1-39.33-39.285z m-29.998-249.018a106.985 106.985 0 0 1 55.878-47.08l-0.047 3.956v131.84a18.525 18.525 0 0 0 9.356 16.105l139.264 80.407-48.221 27.834a1.745 1.745 0 0 1-1.63 0.14l-115.316-66.63a107.497 107.497 0 0 1-39.284-146.595z m396.102 92.16l-139.24-80.384 48.197-27.834a1.722 1.722 0 0 1 1.629-0.163l115.316 66.583a107.427 107.427 0 0 1-16.593 193.746V521.704a18.525 18.525 0 0 0-9.31-16.057z m47.988-72.215a171.055 171.055 0 0 0-3.374-2.025L608 365.521a18.618 18.618 0 0 0-18.758 0l-139.24 80.384v-55.761c0-0.535 0.232-1.07 0.698-1.396l115.293-66.514a107.38 107.38 0 0 1 159.441 111.174z m-301.638 99.235l-48.22-27.834a1.699 1.699 0 0 1-0.932-1.327V370.316a107.38 107.38 0 0 1 176.059-82.456 97.135 97.135 0 0 0-3.375 1.932l-114.083 65.885a18.572 18.572 0 0 0-9.356 16.105v0.116l-0.093 160.745z m26.205-56.46L512 440.343l62.022 35.817v71.633L512 583.587l-62.022-35.794V476.16z"
                                        fill="#FFFFFF" p-id="1297"></path>
                                </svg>
                            </div>
                            
                        </div>
                        <div class="chart title_left" v-if="item.role === 'assistant'">
                            <div class="icon">
                                <span class="name">ChartGPT </span>
                                <span class="time"> {{ item.createdAt }} </span>
                                
                            </div>
                            <div class="content">
                                <svg t="1688460128468" class="icon avatar" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="1144" width="30" height="30">
                                    <path
                                        d="M815.616 0H208.384C93.3 0 0 94.068 0 210.083v603.834C0 929.955 93.3 1024 208.384 1024h607.232C930.7 1024 1024 929.955 1024 813.917V210.083C1024 94.068 930.7 0 815.616 0z"
                                        fill="#10A37F" p-id="1145"></path>
                                    <path
                                        d="M757.364 460.032A142.825 142.825 0 0 0 745.1 342.807a144.407 144.407 0 0 0-155.462-69.26 142.708 142.708 0 0 0-106.729-47.988h-1.257a144.384 144.384 0 0 0-137.355 99.933 142.755 142.755 0 0 0-95.418 69.237 144.43 144.43 0 0 0 17.757 169.262 142.825 142.825 0 0 0 12.241 117.202 144.384 144.384 0 0 0 155.462 69.26A142.755 142.755 0 0 0 541.09 798.44h1.28a144.337 144.337 0 0 0 137.356-100.003 142.732 142.732 0 0 0 95.418-69.237 144.198 144.198 0 0 0-17.78-169.192zM542.022 760.995h-0.163a107.148 107.148 0 0 1-68.562-24.855 69.857 69.857 0 0 0 3.375-1.932l114.06-65.862a18.548 18.548 0 0 0 9.379-16.128v-160.93l48.22 27.833a1.722 1.722 0 0 1 0.932 1.327v133.19a107.497 107.497 0 0 1-107.241 107.357z m-230.68-98.514a107.148 107.148 0 0 1-12.8-71.936l3.398 2.002 114.037 65.885a18.595 18.595 0 0 0 18.758 0l139.264-80.407v55.784a1.745 1.745 0 0 1-0.699 1.374l-115.293 66.56a107.567 107.567 0 0 1-107.334 0 107.497 107.497 0 0 1-39.33-39.285z m-29.998-249.018a106.985 106.985 0 0 1 55.878-47.08l-0.047 3.956v131.84a18.525 18.525 0 0 0 9.356 16.105l139.264 80.407-48.221 27.834a1.745 1.745 0 0 1-1.63 0.14l-115.316-66.63a107.497 107.497 0 0 1-39.284-146.595z m396.102 92.16l-139.24-80.384 48.197-27.834a1.722 1.722 0 0 1 1.629-0.163l115.316 66.583a107.427 107.427 0 0 1-16.593 193.746V521.704a18.525 18.525 0 0 0-9.31-16.057z m47.988-72.215a171.055 171.055 0 0 0-3.374-2.025L608 365.521a18.618 18.618 0 0 0-18.758 0l-139.24 80.384v-55.761c0-0.535 0.232-1.07 0.698-1.396l115.293-66.514a107.38 107.38 0 0 1 159.441 111.174z m-301.638 99.235l-48.22-27.834a1.699 1.699 0 0 1-0.932-1.327V370.316a107.38 107.38 0 0 1 176.059-82.456 97.135 97.135 0 0 0-3.375 1.932l-114.083 65.885a18.572 18.572 0 0 0-9.356 16.105v0.116l-0.093 160.745z m26.205-56.46L512 440.343l62.022 35.817v71.633L512 583.587l-62.022-35.794V476.16z"
                                        fill="#FFFFFF" p-id="1146"></path>
                                </svg>
                                <div style="max-width: calc(100% - 40px);">
                                    <van-popover class="pop" v-show="item.showPopover" placement="top" theme="dark">
                                        <template #default>
                                            <van-grid
                                                square
                                                clickable
                                                :border="false"
                                                column-num="3"
                                                style="width: 240px;"
                                            >
                                                <van-grid-item class="grid-item" icon-color="black" text="复制" icon="https://e3kkst.us.aircodecdn.com/copy.1691747613765_m09nyo7fdbq.png" @click="copy(item);item.showPopover = false;"/>
                                                <van-grid-item class="grid-item" icon-color="black" text="删除" icon="https://e3kkst.us.aircodecdn.com/delete.1691747635523_48ah11cf9mb.png" @click="item.showPopover = false"/>
                                                <van-grid-item class="grid-item" icon-color="black" text="收藏" icon="https://e3kkst.us.aircodecdn.com/collection.1691747645860_jc0sv9co2ec.png" @click="item.showPopover = false"/>
                                            </van-grid>
                                        </template>
                                        <template #reference>
                                            <p @click="item.showPopover=true" @contextmenu="($event) => { onContextMenu(item, $event) }" v-html="item.content"></p>
                                        </template>
                                    </van-popover>
                                </div>
                                
                            </div>
                        </div>
                </div>
            </div>
            
        </div>
        <div class="bottom">
                <a-input class="input_" v-model:value="text"
                    placeholder="问题描述" @keyup.enter="onSearch"
                    @keyup.up="onUp" @keyup.down="onDown" />
            </div>
    </div>
</template>

<script setup>
// https://mtzjcxsa93.us.aircode.run/chat?question=您好
import { SendOutlined, MenuUnfoldOutlined, MenuFoldOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { marked } from "marked"
import hljs from 'highlight.js'
import dayjs from "dayjs"
import axios from "axios"
import home from "@/store/index"
import { ref, reactive, toRefs, onMounted, nextTick, h ,computed ,watch,defineEmits} from "vue"
import ContextMenu from '@imengyu/vue3-context-menu'
import _ from "lodash";
import useClipboard from 'vue-clipboard3'
import { message } from 'ant-design-vue';
import Chart from "@/api/chart.api.js"
import Tools from "@/utils/tools.js"




//变量声明
const isMobile = Tools.isMobile();
const store = home();
const text = ref('');
const myCharts = reactive({
    datas: [],
    current: 0
})

const emit = defineEmits(['newGroup'])


//发送消息
const onSearch = async (event) => {
    if(store.chartKey[0]=="" || _.isEmpty(store.menus)){
        emit('newGroup');
        return;
    }
    console.log(text.value, event);
    if (event.code == 'NumpadEnter') return;
    if (_.isEmpty(text.value)) {
        message.info({
            content: "不能发送空白消息"
        })
        return;
    }
    chartsData.value.push({
        role: 'user',
        content: text.value,
        createdAt: dayjs().format('YYYY年MM月DD日 HH:mm:ss')
    });
    myCharts.datas.push(text.value);
    myCharts.current = myCharts.datas.length
    nextTick(() => {
        document.querySelector('.main>div:last-child').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    })

    let searchText = text.value;
    text.value = ''
    let res = await Chart.chart(searchText,store.chartKey[0]);
    console.log(res);
    res.content=marked.parse(res.content)
    chartsData.value.push(res)
    nextTick(() => {
        document.querySelector('.main>div:last-child').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    })



}

//上
const onUp = () => {
    if (_.isEmpty(myCharts.datas)) return;
    if (myCharts.datas[myCharts.current - 1]) myCharts.current--;
    text.value = myCharts.datas[myCharts.current].trim();
}
//按下键
const onDown = () => {
    if (_.isEmpty(myCharts.datas)) return;
    if (myCharts.datas[myCharts.current + 1]) {
        myCharts.current++;
        text.value = myCharts.datas[myCharts.current].trim();
    } else {
        text.value = ""
    }

}

const copy = async (item) => {
    const { toClipboard } = useClipboard();
    try {
        await toClipboard(item.content)
    } catch (error) {
        console.log(error);
    } finally{
        item.showPopover = false;
    }
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
                label: "复制",
                icon: 'icon-document-copy',
                onClick: async () => {
                    copy(item)
                }
            }
        ]
    })
}



const isOpen = ref(true)
const activeMenuIcon = () => {
    isOpen.value = !isOpen.value
}
const chartsData=ref([]);

const init = (val) => {

    store.mine(val[0]).then(charts=>{
        let _charts = _.cloneDeep(charts);
        chartsData.value=_charts;
        nextTick(() => {
            document.querySelector('.main>div:last-child')?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        })
    })
}


watch(()=>store.chartKey , init)

//初始化
onMounted(() => {
    init(store.chartKey)
})
</script>

<style lang="scss" scoped>
.frame {
    display: flex;
    width: calc(100vw - 16.25rem);
    flex-direction: column;
    align-items: center;
    position: relative;
    transition: all .5s;
}

.container {
    flex-direction: column;
    align-items: center;
    position: relative;
}

.top,
.main,
.bottom,
.container {
    display: flex;
    width: 100%;
}

.top {
    height: 5vh;
    padding: 0 5px;
    justify-content: space-between;

    .menu-icon {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;

        .menu-active-icon {
            font-size: 16px;
            transition: all .5s;
            left: 0;
            position: absolute;
            z-index: 0;
            background-color: #fff;
            font-size: 29px;
            transition: all 1s;
            opacity: 0;
        }

        .open-the-left-menu {
            z-index: 1;
            opacity: 1;
        }

        .menu-active-icon:hover {
            background: rgba(249, 183, 55, .3);
            color: #fff;
        }

    }
}




.main {
    height: 100vh;
    overflow-y: auto;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 10vh;

    p {
        margin-bottom: 0;
    }

    

    .ms {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
        padding: 10px;
        transition: all .5s;

        .chart {
            height: auto;
            display: flex;
            gap: 10px;
            flex-direction: column;

            .content {
                display: flex;
                gap: 10px;

                ::v-deep .van-popover__wrapper{
                    width: 100%;
                }

                
            }

            .icon {
                display: flex;
                gap: 10px;
                font-size: 10pt;

                svg {
                    width: 37px;
                    height: 37px;
                }
            }

            p {
                padding: 10px;
                border-radius: 8px;
                cursor: context-menu;
                width: 100%;
            }

        }

        .title_left {

            .content {
                align-items: flex-start;
            }

            .icon {
                .name {
                    align-self: flex-start;
                }
            }

            p {
                background-color: rgba(34, 187, 85, .3);
            }
        }

        .title_right {


            
            .content {
                justify-content: flex-end;
                align-items: flex-start;
            }

            .icon {
                justify-content: flex-end;

                .name {
                    align-self: flex-endt;
                }
            }

            p {
                background-color: rgba(255, 192, 203, .3);
            }
        }
    }


    .avatar{
        min-width: 30px;
    }


}

.main::-webkit-scrollbar {
    display: none;
}

.bottom {
    width: 100%;
    height: 10vh;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(0deg, #fff,#fff, transparent);
    position: absolute;
    bottom: 0;


    .input_ {
        height: 58px;
        width: 75%;
        padding: 10px;
        border-radius: 0.75rem;
    }

    .send_btn {
        border: 0;
        position: absolute;
        right: 15px;
    }
}

.grid-item{
    flex-basis: 25%;
    padding-top: 25%;
    background: transparent;

    ::v-deep .van-grid-item__content{
        background-color: transparent;

        .van-grid-item__text{
            color: #fff;
        }
    }
}
</style>
<style lang="scss" scoped>

@media screen and (max-width: 500px) {
    .main{
        padding: 0 0 5rem;
        height: calc(100vh - 2.875rem);
        width: 100vw;
        overflow-x: hidden;
    }

    p{
        
        font-size: 10pt;
        text-indent: 20pt;
        line-height: 30px;

    }

    .bottom .input_{
        height: 45px;
        width: 95%;
        border-radius: 0.45rem;
    }

    ::v-deep code.hljs{
        text-indent: 0;
    }
}
</style>