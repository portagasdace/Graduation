<template>
    <div class="contant">
        <div class="login">
            <div class="title">毕业设计后台管理</div>
            <div class="formLogin">
                <el-form ref="form" :model="form" label-width="60px">
                    <el-form-item label="账号:" style="color:#fff">
                        <el-input class="loginBtn" v-model="form.usernaem" @keyup.enter.native="login"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" style="color:#fff">
                        <el-input class="loginBtn" v-model="form.password" type="password" @keyup.enter.native="login"></el-input>
                    </el-form-item>
                    <el-button type="primary" round @click="login">登陆</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import service from './service'
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    usernaem:'',
                    password:''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            login(){
                let data = {
                    username:this.form.usernaem,
                    password:this.form.password
                }
                service.login(data).then(data => {
                    if(data.data.success) {
                        if (data.data.message != "用户名密码错误") {
                            sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))
                            this.$router.push({
                                name: 'Layout',
                                path: '/layout'
                            })
                        } else {
                            this.$message({
                                showClose: true,
                                message: '账号或密码错误',
                                type: 'warning'
                            });
                        }
                    }
                })
            }
        },
        mounted() {

        }
    }
</script>
<style scoped>
    .el-form-item__label{
        color: #000;
        text-align: left;
        font-size: 20px;
        margin-top: 15px;
    }
    .el-button--primary{
        position: absolute;
        bottom: 20px;
        width:300px;
        margin: 0 auto;

    }
    .el-input__inner{
        margin-top: 15px;
        /*border: 1px solid #66b1ff;*/
        border-radius: 20px;
    }
    .contant{
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: 0;
        font-family: 'microsoft yahei';
        background-image: url(../../assets/login_bg.jpg);
    }
    .login{
        width: 600px;
        height: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        /*background: red;*/
    }
    .title{
        width: 100%;
        height: 100px;
        font-size:36px;
        font-weight: bold;
        color: #fff;
        text-align: center;
    }
    .formLogin{
        position: relative;
        width:300px;
        margin: 0 auto;
        height:200px;
        padding: 20px 20px;
        /*border: 1px solid #fff;*/
        border-radius:20px;
        background: #e3e7ea;
    }
</style>