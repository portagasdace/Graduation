import api from '@/api';
    let roleList = (data) =>api.get('/bishe/role/list',data);
    let rolePerm = (data) =>api.get('/bishe/role/perm/'+data.id,data);
    let roleUser = (data) =>api.get('/bishe/role/user/'+data.id,data);
    let assign = (data) =>api.post('/bishe/role/assign?id='+data.id+'uids='+data.uid,data);
    let saveOrUpdate = (data) =>api.post('/bishe/role/saveOrUpdate?role_name ='+data.role_name +'role_code ='+data.role_code ,data);
    export default {
        rolePerm,
        roleUser,
        roleList,
        assign,
        saveOrUpdate
    }
