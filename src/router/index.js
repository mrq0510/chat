import {createRouter,createWebHashHistory} from "vue-router"
import Tool from "@/utils/tools.js"
import home from "@/store"

const routes=[
    {
        path:'/',
        redirect:'/login',
    },
    {
        path:'/base',
        name:'base',
        component:()=>import('@/views/Base.vue'),
        children:[
            {
                path:'index',
                name:'home',
                component:()=>import('../views/Home.vue'),
            },
        ]
    },
    {
        path:'/login',
        name:"login",
        component:()=>import('@/views/Login.vue')
    },
    {
        path:'/m',
        redirect:'/m/index',
        component:()=>import('@/mobile/App.vue'),
        children:[
            {
                path:'index',
                name:'index',
                component:()=>import('@/mobile/views/Index.vue')
            }
        ]
    },
    {
        path:'/m/login',
        name:'mobileLogin',
        component:()=>import('@/mobile/views/Login.vue')
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})


router.beforeEach((to,from,next)=>{
    const store =  home();
    console.log(store);
    if(to.path.includes('/login')){
        next();
        return;
    }
    if(!store.user?._id){
        next('/login')
        return;
    }
    if(Tool.isMobile() && !to.path.includes('/m/')){
        next({path:'/m'+to.path.replace('/base',''),query:{...to.query}})
        return ;
    }else if(!Tool.isMobile() && to.path.includes('/m/')){
        next({path:to.path.replace('/m/','/base/') ,query:{...to.query}})
        return ;
    }else if(!Tool.isMobile() && !to.path.includes('/base/') && !to.path.includes('login')){
        next({path:'/base'+to.path ,query:{...to.query}});
        return;
    }else{
        next();
    }
})

export default router;