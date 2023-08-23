import service from "@/api/service";



const Chart = {}

Chart.mineChartMenus=(user_id)=>{
    return service.post('/api/MineChartMenus',{
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

//我的聊天
Chart.mine=(new_chart_id)=>{
    return service.get('/api/Mine',{
        params:{
            new_chart_id
        }
    }).then(res=>{
        return res.data
    })
}

//聊天
Chart.chart=(question,new_chart_id)=>{
    return service.get('/api/Chart',{
        params:{
            question,
            new_chart_id
        }
    }).then(res=>{
        return res.data
    })
}

//新建聊天
Chart.newChart=(newChartName,user_id)=>{
    return service.post('/api/NewChart',{
        data:{
            newChartName,
            user_id
        },
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>{
        return res.data
    })
}

//删除聊天组
Chart.deleteChartGroup=(new_chart_id)=>{
    return service.get('/api/DeleteChartGroup',{
        params:{
            new_chart_id,
        }
    }).then(res=>res.data)
}


export default Chart;