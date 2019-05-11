import api from '@/api';
    let process = (data) =>api.get('/bishe/process/list');
    let saveOrUpdate = (data) =>api.post('/bishe/process/saveOrUpdate',data);
    let deleteProcess = (data) =>api.post('/bishe/process/delete/'+data.id,data);
    export default {
        saveOrUpdate,
        deleteProcess,
        process,
    }
