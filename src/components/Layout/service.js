import api from '@/api';
    let update = (data) =>api.post('/bishe/user/update',data);
    let logout = (data) =>api.get('/bishe/user/logout',data);
    export default {
        update,
        logout

    }
