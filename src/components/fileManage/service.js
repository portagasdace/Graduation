import api from '@/api';
    let fileList = (data) =>api.get('/bishe/file/list?pageNum='+data.pageNum+'&pageSize='+data.pageSize+'&originalfilename='+data.originalfilename,data);
    let downloadFile = (data) =>api.post('/bishe/file/downloadFile',data);
    let deleteFile = (data) =>api.post('/bishe/file/delete/'+data.id,data);
    export default {
        downloadFile,
        deleteFile,
        fileList,
    }
