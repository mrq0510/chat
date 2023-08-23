import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from "./router"
import piniaPersist from 'pinia-plugin-persist'
import _ from "lodash";
window._ = _;
console.log('测试',_)
import {createPinia} from "pinia"

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import 'highlight.js/styles/idea.css'

import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

import 'vant/lib/index.css';
import { Button , SwipeCell , Popover , Grid , GridItem , NavBar  ,Cell} from 'vant';

import '@/assets/style/font.css'

const app = createApp(App)

const componentsForVant =  [ Button , SwipeCell , Popover , Grid , GridItem ,NavBar,Cell ];

for (const com of componentsForVant) {
    app.use(com)
}

const pinia = createPinia();
pinia.use(piniaPersist);
app.use(router).use(pinia).use(Antd).use(ContextMenu).mount('#app')
