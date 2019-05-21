import api from '@/api';
    let subjectSelection = (data) =>api.get('/bishe/topicselectioninformation/list?pageNum='+data.pageNum+'&pageSize='+data.pageSize+'&name='+data.name,data);
    let update = (data) =>api.post('/bishe/topicselectioninformation/saveOrUpdate',data);
    let exportApi = (data) =>api.get('/bishe/topicselectioninformation/export',data);
    let deleteSubject = (data) =>api.post('/bishe/topicselectioninformation/delete/'+data.id,data);
    export default {
        update,
        exportApi,
        deleteSubject,
        subjectSelection,
    }
