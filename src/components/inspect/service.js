import api from '@/api';
    let midinspection = (data) =>api.get('/bishe/midinspection/list?pageNum='+data.pageNum+'&pageSize='+data.pageSize,data);
    // let update = (data) =>api.post('/bishe/topicselectioninformation/saveOrUpdate',data);
    let deleteMidinspection = (data) =>api.post('/bishe/midinspection/delete/'+data.id,data);
    // let upload = (data) =>api.post('/bishe/file/upload',data);
    // let uploadAnnouncement = (data) =>api.post('/bishe/announcement/save',data);
    export default {
        midinspection,
        deleteMidinspection
    }
