import api from '@/api';
    let studentList = (data) =>api.get('/bishe/student/list?pageNum='+data.pageNum+'&pageSize='
        +data.pageSize+'&number='+data.number+'&name='+data.name+'&major='+data.major+'&grades='+data.grades,data);
    let update = (data) =>api.post('/bishe/student/saveOrUpdate',data);
    let deleteStudent = (data) =>api.post('/bishe/student/delete/'+data.id,data);
    export default {
        update,
        deleteStudent,
        studentList,
    }
