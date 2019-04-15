import api from '@/api';
    let openingtList = (data) =>api.get('/bishe/openingreport/list?pageNum='+data.pageNum+'&pageSize='+data.pageSize+'&s_number='+data.s_number,data);
    let update = (data) =>api.post('/bishe/subject/saveOrUpdate',data);
    let deleteOpening = (data) =>api.post('/bishe/openingreport/delete/'+data.id,data);
    export default {
        update,
        deleteOpening,
        openingtList,
    }
