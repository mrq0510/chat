import service from "@/api/service";



const User = {}

User.login=({username,password})=>{
    return service.post('/api/UserLogin',{
        data:{
            username,
            password
        },
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>{
        return res.data;
    })
}


User.loginout=(user_id)=>{
    return service.post('/api/UserLoginOut',{
        data:{
            user_id
        },
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>{
        return res.data;
    })
}

export default User