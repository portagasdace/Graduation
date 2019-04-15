import api from '@/api';
    let subjectList = (data) =>api.get('/bishe/subject/list?pageNum='+data.pageNum+'&pageSize='+data.pageSize+'&s_name='+data.s_name+'&tname='+data.tname,data);
    let update = (data) =>api.post('/bishe/subject/saveOrUpdate',data);
    let deleteSubject = (data) =>api.post('/bishe/subject/delete/'+data.id,data);
    export default {
        update,
        deleteSubject,
        subjectList,
    }
