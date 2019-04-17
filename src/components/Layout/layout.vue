<template>
    <div class="layout">
        <el-container>
            <el-header style="height: 80px">
                <div class="logo">
                    <img src="../../assets/logo.png" alt="">
                    <h1>高校毕设系统后台管理</h1>
                </div>
                <div class="user">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link"><i class="iconfont icon-yonghu"></i>{{username}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-aside width="202px">
                    <el-menu
                            :default-active="this.$router.path" router
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose">
                        <el-submenu v-for="(item,index) in menuList" :index=index.toString() :key="index">
                            <template slot="title">
                                <i :class="item.iconClass"></i>
                                <span>{{item.label}}</span>
                            </template>
                            <el-menu-item-group>
                               <el-menu-item v-for="(chilitem,index1) in item.children" :index="chilitem.name" :key="index1">{{chilitem.label}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "ddd",
        data() {
            return {
                index:null,
                username:'',
                menuList:[
                    {
                        label:'教师管理',
                        iconClass:"iconfont icon-jiaoshiguanli",
                        children:[
                            {label:'课题管理',name:'/projectManage',},
                            {label:'个人信息',name:'/personalInfo'}
                        ]
                    },
                    {
                        label:'学生管理',
                        iconClass:"iconfont icon-xueshengguanli",
                        children:[
                            {label:'个人信息',name:'/personalInfoStu'}
                        ]
                    },
                    {
                        label:'信息管理',
                        iconClass:"iconfont icon-jichuxinxiguanli",
                        children:[
                            {label:'选题管理',name:'/selctionManage'},
                            {label:'开题报告',name:'/thesisProposal'},
                            {label:'中期检查信息',name:'/inspect'},
                            {label:'论文信息管理',name:'/dissertation'},
                            {label:'公告信息管理',name:'/proclamation'},
                        ]
                    },
                    {
                        label:'系统管理',
                        iconClass:"iconfont icon-xitongguanli",
                        children:[
                            {label:'角色管理',name:'/roleManage'},
                            // {label:'权限管理',name:'/powerManage'},
                            {label:'文件管理',name:'/fileManage'},
                        ]
                    }
                ]
            }
        },
        methods: {
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {

            },
        },
        mounted() {
            var userinfo = sessionStorage.getItem("userInfo");
            if(userinfo){
                this.username = JSON.parse(userinfo).username;
            }
        }
    }
</script>
<style>
    *{
        font-family: "微软雅黑";
    }
    .layout .el-container {
       height:100%;
    }
    .el-pagination{
       float: right;
    }
</style>
<style scoped>
    .layout{
        width: 100%;
        height: 100%;
    }
    .logo{
        color: #fff;
        width: 450px;
        float: left;
        margin-left: 25px;
        height: 100%;
    }
    .el-dropdown-menu{
        top:50px !important;
        left: inherit;
        width: 110px;
    }
    .logo img{
        width: 50px;
        height: 50px;
        margin-top:15px;
        margin-right: 10px;
        float: left;
    }
    .logo h1{
        width:350px;
        height: 100%;
        font-size: 34px;
        float: left;
    }
    .user{
        position: relative;
        width:140px;
        height: 100%;
        float: right;
        margin-right: 20px;
    }
    .user i{
        cursor: pointer;
        float: left;
        margin-right: 10px;
        font-size: 30px;
        color: #fff;
    }
    .user span{
        cursor: pointer;
        display: block;
        width: 110px;
        float: right;
        line-height:80px;
        font-size: 20px;
        color: #fff;
    }
    .el-menu{
        border-right: none;
    }
    .el-menu .iconfont{
        font-size: 26px;
        margin-right: 10px;
        font-weight: bold;
    }
    .el-header{
        background-color: #3c8dbc;
        color: #333;
        line-height:80px;
    }

    .el-aside {
        background-color: #fff;
        color: #333;
        border-right: 1px solid #e8ebf0;
        text-align: center;
        position: absolute;
        bottom: 0px;
        top: 80px;
    }

    .el-main {
        position: relative;
        background-color: #eceff4;
        color: #333;
        margin-left: 202px;
    }

    body > .el-container {
        margin-bottom: 40px;
        position: absolute;
        bottom: 0px;
        top:80px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>