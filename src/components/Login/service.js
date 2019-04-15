import api from '@/api';
    let login = (data) =>api.post('/bishe/user/login',data);
export default {
    login,
}
