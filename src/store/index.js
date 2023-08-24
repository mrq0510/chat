import {defineStore} from "pinia"
import Chart from "@/api/chart.api.js";
import User from "@/api/User.api.js";
import {ref} from "vue"
import { marked } from "marked"
import hljs from 'highlight.js'
import _ from "lodash";
import {message} from "ant-design-vue";
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    langPrefix: 'hljs language-',
    xhtml: false,
    highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
    }
})

export default defineStore('home',{
    state(){
        return {
            text:"测试",
            info:null,
            chartKey:[],
            menus:[],
            user:{},
            SERVERACTIVE:null
        }
    },
    actions:{
        setSERVERACTIVE(data){
            this.SERVERACTIVE=data;
        },
        setTest(data){
            this.test=data
        },
        setChartKey(data){
            this.chartKey=data;
        },
        async mineChartMenus(){//获取聊天组
            let res = await Chart.mineChartMenus(this.user._id);
            this.chartKey=this.chartKey[0]==='' || this.chartKey[0] == undefined ?  [res[0]?.new_chart_id] : this.chartKey;
            console.log(this.chartKey,res);
            this.menus=res;
        },
        async mine(new_chart_id){//当前聊天组的聊天记录
            let res = await Chart.mine(new_chart_id);
            let _charts = _.cloneDeep(res);
            let data = _charts.map(m=>({
                ...m,
                content:marked.parse(m.content)
            }))
            console.log(data);
            return data
        },
        async chart(question,new_chart_id){
            let res = await Chart.chart(question,new_chart_id)
        },
        async newChartGroup(newChartName){
            let res =  await Chart.newChart(newChartName,this.user._id);
            return res
        },
        async login({username,password}){
            let res = await User.login({username,password});
            console.log(res);
            if(res._id){
                this.user=_.cloneDeep(res)
            }else if(res.message){
                message.error(res.message)
            }
            return this.user;
        },
        async loginout(){
            let res = await User.loginout(this.user._id);
            this.menus=[];
            this.chartKey=[''];
            this.user={}
            return res
        },
        async deleteChatGroup(new_chart_id){
            await Chart.deleteChartGroup(new_chart_id);
            message.success('成功删除');
            this.chartKey=[this.menus[this.menus.findIndex(v=>v.new_chart_id===new_chart_id)+1 || 0]?.new_chart_id || '']
            this.mineChartMenus();
        }
    },
    persist: {
        enabled: true
    }
})