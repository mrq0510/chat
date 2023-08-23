import axios from "axios";
import _ from "lodash"
const service = axios.create({
    timeout:1000*60*3
});

const sercers=new Proxy({servers:[
    {
        name:'服务器1',
        server:'https://yjqyphm377.us.aircode.run'
    },
    {
        name:'服务器2',
        server:'https://2n8gkwwm28.us.aircode.run/'
    }
],active:0},{
    set(target,p,value){
        if(p==='servers'){
            return false;
        }
        console.log(p,value);
        target[p]=value;
        service.defaults.baseURL=`/server${sercers.active+1}`
        return true
    },
    get(target,prop){
        return target[prop]
    },
})
sercers.active=1
let home = JSON.parse(sessionStorage.getItem('home')||'{}')
if(!_.isEmpty(home)){
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