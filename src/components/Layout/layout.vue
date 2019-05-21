<template>
    <div class="layout">
        <el-container>
            <el-header style="height: 80px">
                <div class="logo">
                    <img src="../../assets/logo.png" alt="">
                    <h1>高校毕设系统后台管理</h1>
                </div>
                <div class="user">
                    <el-dropdown trigger="click" >
                        <span class="el-dropdown-link"><i class="iconfont icon-yonghu"></i>{{username}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="updatePassword">修改密码</el-dropdown-item>
                            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
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
                               <el-menu-item @click="menuClick" v-for="(chilitem,index1) in item.children" :index="chilitem.name" :key="index1">{{chilitem.label}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <div class="message" v-if="show">
                            <h1>技术架构</h1>
                            <ul>
                                <li v-for="item in messageList">{{item.text}}</li>
                            </ul>
                        </div>
                    <router-view>
                        
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="25%" >
                <el-form :model="form" :rules="rules" ref="ruleForm" class="demo-form-inline" style="width:80%" >
                    <el-form-item label="新密码" :label-width="formLabelWidth" prop="password">
                        <el-input class="formBtn" size="medium" v-model="form.password" type="password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" :label-width="formLabelWidth" prop="newPassword">
                        <el-input class="formBtn" size="medium" v-model="form.newPassword" type="password" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save" >确 定</el-button>
                </div>
            </el-dialog>
    </div>
</template>

<script>
import service from './service'
    export default {
        name: "ddd",
        data() {
            return {
                formLabelWidth: '95px',
                index:null,
                show:false,
                username:'',
                dialogFormVisible:false,
                messageList:[
                    {text:'1.框架：springboot'},
                    {text:'2.安全框架：shrio'},
                    {text:'3.持久层框架：mybatis'},
                    {text:'4.数据库：mysql'},
                    {text:'5.项目管理工具：Maven'},
                    {text:'6.分页插件：pagehelper'},
                    {text:'7.Jdk版本：jdk1.8.0_202'},
                    {text:'8.编辑器：IDEA'},
                    {text:'9.数据库管理工具：navicat'}
                ],
                form:{
                    password:'',
                    newPassword:''
                },
                rules:{
                    password: [
                            { required: true, message: '密码不能为空', trigger: ['blur','change'] }
                        ],
                        newPassword: [
                            { required: true, message: '确认密码不能为空', trigger: ['blur','change'] }
                        ]
                },
                userinfo:'',
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
                            // {label:'开题报告',name:'/thesisProposal'},
                            {label:'进度安排',name:'/progress'},
                            // {label:'中期检查信息',name:'/inspect'},
                            // {label:'论文信息管理',name:'/dissertation'},
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
            menuClick(){
                this.show = false
            },
            handleClose(key, keyPath) {

            },
            updatePassword(){
                this.dialogFormVisible = true
            },
            logout(){
                service.logout().then(data => {
                    if(data.data.success){
                        if(data.data.success){
                            sessionStorage.clear()
                            this.$router.push({
                                path:'/'
                            })
                        }
                    }
                })
            },
            save(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                       if(this.form.password === this.form.newPassword){
                            let obj= {
                                id:JSON.parse(this.userinfo).id,
                                password:this.form.newPassword
                            }
                            console.log(this.userinfo)
                            service.update(obj).then(data => {
                                if(data.data.success){
                                    console.log(data.data)
                                    if(data.data.success){
                                        this.dialogFormVisible = false
                                        sessionStorage.clear()
                                        this.$router.push({
                                            path:'/'
                                        })
                                    }
                                   
                                }
                            })
                        }else{
                            this.$message({
                                message: '两次密码输入不一致',
                                type: 'warning'
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            }
             
        },
        mounted() {
            console.log(this.$route)
            if(this.$route.params.isShow){
                this.show = true;
            }
            this.userinfo = sessionStorage.getItem("userInfo");
            if(this.userinfo){
                this.username = JSON.parse(this.userinfo).realname;
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
    .message{
        text-align: left;
        width: 260px;
        height: 380px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%)

    }
    .message li{
        font-size: 20px;
        margin: 10px 0;
        list-style: none;
    }
    .message h1{
        font-size: 35px;
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