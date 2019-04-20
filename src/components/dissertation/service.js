import api from '@/api';
    let paperList= (data) =>api.get('/bishe/paperinformation/list?pageNum='+data.pageNum+'&pageSize='+data.pageSize+'&s_name='+data.s_name+'&name='+data.name,data);
    let deletePaper = (data) =>api.post('/bishe/paperinformation/delete/'+data.id,data);
    let update = (data) =>api.post('/bishe/paperinformation/saveOrUpdate',data);
    export default {
        deletePaper,
        update,
        paperList,
    }
