import api from '@/api';
    let announcement = (data) =>api.get('/bishe/announcement/list?pageNum='+data.pageNum+'&pageSize='+data.pageSize,data);
    let update = (data) =>api.post('/bishe/topicselectioninformation/saveOrUpdate',data);
    let deleteAnnouncement = (data) =>api.post('/bishe/announcement/delete/'+data.id,data);
    let upload = (data) =>api.post('/bishe/file/upload',data);
    let uploadAnnouncement = (data) =>api.post('/bishe/announcement/save',data);
    export default {
        upload,
        uploadAnnouncement,
        update,
        deleteAnnouncement,
        announcement,
    }
