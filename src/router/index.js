import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Layout from '@/components/Layout/layout'
import projectManage from '@/components/projectManage/projectManage' //课题管理
import personalInfoStu from '@/components/personalInfoStu/personalInfoStu' // 学生管理个人信息
import personalInfo from '@/components/personalInfo/personalInfo' // 教室管理个人信息
import selctionManage from '@/components/selctionManage/selctionManage' // 选题管理
import thesisProposal from '@/components/thesisProposal/thesisProposal' // 开题报告
import progress from '@/components/progress/progress' // 进度安排
import inspect from '@/components/inspect/inspect' // 中期检查信息
import dissertation from '@/components/dissertation/dissertation' // 论文信息管理
import proclamation from '@/components/proclamation/proclamation' // 公告信息管理
import roleManage from '@/components/roleManage/roleManage' // 角色管理
import powerManage from '@/components/powerManage/powerManage' // 权限管理
import fileManage from '@/components/fileManage/fileManage' // 文件管理
import demo from '@/components/demo/index' // 文件管理

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/layout',
            name: 'Layout',
            component: Layout,
            children:[
                {
                    path: '/projectManage',
                    name: 'projectManage',
                    component: demo
                },
                {
                    path: '/demo',
                    name: 'demo',
                    component: demo
                },
                {
                    path: '/personalInfoStu',
                    name: 'personalInfoStu',
                    component: personalInfoStu
                },
                {
                    path: '/personalInfo',
                    name: 'personalInfo',
                    component: personalInfo
                },
                {
                    path: '/selctionManage',
                    name: 'selctionManage',
                    component: selctionManage
                },
                {
                    path: '/inspect',
                    name: 'inspect',
                    component: inspect
                },
                {
                    path: '/thesisProposal',
                    name: 'thesisProposal',
                    component: thesisProposal
                },
                {
                    path: '/dissertation',
                    name: 'dissertation',
                    component: dissertation
                },
                {
                    path: '/proclamation',
                    name: 'proclamation',
                    component: proclamation
                },
                {
                    path: '/roleManage',
                    name: 'roleManage',
                    component: roleManage
                },
                {
                    path: '/progress',
                    name: 'progress',
                    component: progress
                },
                {
                    path: '/powerManage',
                    name: 'powerManage',
                    component: powerManage
                },
                {
                    path: '/fileManage',
                    name: 'fileManage',
                    component: fileManage
                },
            ]
        },

    ]
})
