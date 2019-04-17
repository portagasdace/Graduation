import api from '@/api';
    let paperList= (data) =>api.get('/bishe/paperinformation/list?pageNum='+data.pageNum+'&pageSize='+data.pageSize,data);
    // let downloadFile = (data) =>api.post('/bishe/file/downloadFile',data);
    let deletePaper = (data) =>api.post('/bishe/paperinformation/delete/'+data.id,data);
    export default {
        deletePaper,
        // deleteFile,
        paperList,
    }
