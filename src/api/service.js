import axios from "axios";
import _ from "lodash"
const service = axios.create({
    timeout:1000*60*3
});

const sercers=new Proxy({servers:[
    {
        name:'服务器1',
        server:'https://yjqyphm377.us.aircode.run/'
    },
    {
        name:'服务器2',
        server:'https://2n8gkwwm28.us.aircode.run/'
    }
],active:1},{
    set(target,p,value){
        if(p==='servers'){
            return false;
        }
        console.log(p,value,import.meta.env.MODE);
        target[p]=value;
        if(import.meta.env.MODE=='development'){
            service.defaults.baseURL=`/server${target.active+1}`
        }else{
            service.defaults.baseURL=target.servers[target.active].server
        }
        return true
    },
    get(target,prop){
        return target[prop]
    },
})
sercers.active=1
//刷新服务器不会断
let home = JSON.parse(sessionStorage.getItem('home')||'{}')
if(!_.isEmpty(home) && home.SERVERACTIVE){
    sercers.active=home.SERVERACTIVE
}


export {
    sercers
}



service.interceptors.request.use((config)=>{
    console.log(config);
    return config;
},(err)=>{
    return Promise.reject(err)
})

service.interceptors.response.use((res)=>{
    return res;
},(err)=>{
    return Promise.reject(err)
})

export default service