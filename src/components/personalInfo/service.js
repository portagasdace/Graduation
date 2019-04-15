import api from '@/api';
    let techerList = (data) =>api.get('/bishe/teacher/list?pageNum='+data.pageNum+'&pageSize='+data.pageSize+'&number='+data.number+'&tname='+data.tname+'&major='+data.major,data);
    let update = (data) =>api.post('/bishe/teacher/saveOrUpdate',data);
    let deleteTecher = (data) =>api.post('/bishe/teacher/delete',data);
    export default {
        update,
        deleteTecher,
        techerList,
    }
