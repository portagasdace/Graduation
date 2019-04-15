<template>
    <div class="personalInfo">
        <div class="personalInfo-main">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-row :gutter="20">
                    <el-col :span="5">
                        <el-form-item label="学号">
                            <el-input size="medium" v-model="formInline.number" placeholder="学号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="姓名">
                            <el-input size="medium" v-model="formInline.name" placeholder="姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="专业">
                            <el-input size="medium" v-model="formInline.major" placeholder="专业"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="班级">
                            <el-input size="medium" v-model="formInline.grades" placeholder="班级"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button class="serch" size="medium" type="primary" @click="onSubmit">查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="number"
                        width="120px"
                        label="学号">
                </el-table-column>
                <el-table-column
                        prop="name"
                        width="100px"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        width="80px"
                        prop="sex"
                        label="性别">
                </el-table-column>
                <el-table-column
                        prop="age"
                        width="80px"
                        label="年龄">
                </el-table-column>
                <el-table-column
                        prop="collage"
                        label="学院">
                </el-table-column>
                <el-table-column
                        prop="major"
                        label="专业">
                </el-table-column>
                <el-table-column
                        prop="grades"
                        label="班级">
                </el-table-column>
                <el-table-column
                        prop="telephone"
                        label="手机">
                </el-table-column>
                <el-table-column
                        prop="emails"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                class="tabBtn"
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                class="tabBtn"
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog :title="title" :visible.sync="dialogFormVisible" width="35%" >
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item label="学号" :label-width="formLabelWidth">
                        <el-input class="formBtn" disabled size="medium" v-model="form.number" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input class="formBtn" size="medium" v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-select size="medium" v-model="form.sex" placeholder="请选择" @change = "changeSex">
                            <el-option  v-for="item in sexList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年龄" :label-width="formLabelWidth">
                        <el-input class="formBtn" size="medium" v-model="form.age" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="学院" :label-width="formLabelWidth">
                        <el-input class="formBtn" size="medium" v-model="form.collage" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="专业" :label-width="formLabelWidth">
                        <el-input class="formBtn" size="medium" v-model="form.major" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="班级" :label-width="formLabelWidth">
                        <el-input class="formBtn" size="medium" v-model="form.grades" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" :label-width="formLabelWidth">
                        <el-input class="formBtn" size="medium" v-model="form.telephone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                        <el-input class="formBtn" size="medium" v-model="form.emails" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save" >确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="footer">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[2, 4, 6, 10]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import service from './service'
    export default {
        name: "personalInfoStu",
        data() {
            return {
                page:false,
                title:'修改信息',
                total:0,
                pageSize:10,
                currentPage: 1,
                formInline: {
                    number: '',
                    major: '',
                    name:'',
                    grades:''
                },
                sexList:[
                    {
                        label:'男',
                        value:0
                    },
                    {
                        label:'女',
                        value:1
                    }
                ],
                dialogFormVisible: false,
                form: {
                    sid:'',
                    number:'',
                    name: '',
                    sex:'',
                    age:'',
                    collage:'',
                    major:'',
                    telephone:'',
                    emails:'',
                    grades:''
                },
                tableData: [],
                formLabelWidth: '95px'
            }
        },
        methods: {
            // 选择性别
            changeSex(val){
            },
            // 点击没页显示多少条
            handleSizeChange(val) {
                this.pageSize = val;
                this.getstudentList();
                // console.log(`每页 ${val} 条`);
            },
            // 点击页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getstudentList();
                // console.log(`当前页: ${val}`);
            },
            // 查询
            onSubmit(){
                let obj = {};
                for(var i in this.formInline){
                    obj[i] = this.formInline[i];
                }
                obj.pageNum = this.currentPage;
                obj.pageSize = this.pageSize;
                service.studentList(obj).then(data => {
                    if(data.data.success){
                        this.tableData = data.data.data.items;
                        this.total = data.data.data.totalNum;
                    }
                })

            },
            // 确定保存
            save(){
                let obj = {};
                for(var i in this.form){
                    obj[i] = this.form[i];
                }
                if(obj.sex == '男'){
                    obj.sex = 0;
                }else{
                    obj.ex = 1;
                }
                service.update(obj).then(data => {
                    if(data.data.success){
                        this.dialogFormVisible = false;
                        this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getstudentList();
                    }
                })
            },
            //编辑
            handleEdit(index, row) {
                for(var i in row){
                    this.form[i] = row[i];
                }
                // this.form.tid = row.tid;
                this.title = "修改信息"
                this.dialogFormVisible = true;
            },
            //删除
            handleDelete(index, row) {
                let data = {
                    id:row.sid
                }
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    service.deleteStudent(data).then(data => {
                        if(data.data.success){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getstudentList();
                            this.page = true;
                            this.currentPage = this.currentPage;
                            this.pageSize = this.pageSize;
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            getstudentList(){
                let data= {
                    name:this.formInline.name,
                    number:this.formInline.number,
                    major:this.formInline.major,
                    grades:this.formInline.grades,
                    pageNum:this.currentPage,
                    pageSize:this.pageSize
                }
                console.log(this.pageSize)
                service.studentList(data).then(data => {
                    console.log(data)
                    if(data.data.success){
                        this.tableData = data.data.data.items;
                        if(this.pageSize == 10 || this.page){
                            this.total = data.data.data.totalNum;
                        }
                        for(var i = 0;i < this.tableData.length;i++){
                            if(this.tableData[i].sex == '0'){
                                this.tableData[i].sex = '男'
                            }else{
                                this.tableData[i].sex = '女'
                            }
                        }
                    }
                })
            },
        },
        mounted() {
            this.getstudentList();
        }
    }
</script>

<style scoped>
    .personalInfo{
        width: 100%;
        height: 100%;
    }
    .personalInfo-main{
        width: 100%;
        box-sizing: border-box;
        min-height: 100%;
        padding-bottom:60px;
    }
    .footer {
        /*width: 100%;*/
        margin-top:-40px;
        position: absolute;
        left: -20px;
        right: -20px;
        padding-right: 30px;
        padding-top: 15px;
        background-color: #fff;
        color: #333;
        line-height:40px;
    }
    .tabBtn{
        padding: 5px 9px !important;
    }
    .formBtn{
        width: 200px;
    }
    .serch{
        /*padding: 8px 15px !important;*/
    }
    @media (min-width: 1366px) {
        .footer{
            left: 0px;
            right: 0px;
        }
    } /*>=1280的设备*/
</style>