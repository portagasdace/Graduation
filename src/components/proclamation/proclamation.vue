<template>
    <div class="proclamation">
        <div class="proclamation-main">
            <el-form id='myForm' :inline="true" ref="formInline"  :model="formInline" class="demo-form-inline">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item>
                            <el-button class="serch" size="medium" type="primary" @click="add">新增</el-button>
                        </el-form-item>
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
                        prop="title"
                        label="公告题目">
                </el-table-column>
                <el-table-column
                    prop="content"
                    label="公告内容">
                </el-table-column>
                <el-table-column
                        prop="craete_date"
                        label="公告上传时间">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="附件名称">
                        <template slot-scope="scope">
                            <a v-if="scope.row.file" :href="'http://39.105.144.217:8089/bishe/file/downloadFile?fileName=' +encodeURIComponent(scope.row.file.originalfilename)">{{scope.row.file.originalfilename}}</a>
                        </template>
                </el-table-column>
                <el-table-column
                        prop=""
                        label="操作">
                    <template slot-scope="scope">
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
                    <el-form-item label="课题名称" :label-width="formLabelWidth">
                        <el-input class="formBtn" size="medium" v-model="form.s_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" :label-width="formLabelWidth">
                        <el-select size="medium" v-model="form.state" placeholder="请选择">
                            <el-option  v-for="item in statusList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="教师姓名" :label-width="formLabelWidth">-->
                    <!--<el-input class="formBtn" disabled size="medium" v-model="form.teacherName" autocomplete="off"></el-input>-->
                    <!--</el-form-item>-->
                    <el-row class="text">
                        <el-form-item label="课题描述" :label-width="formLabelWidth">
                            <el-input type="textarea" class="textarea" v-model="form.description"></el-input>
                        </el-form-item>
                    </el-row>
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
                    :page-sizes="[1, 4, 6, 10]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <!--<form action="http://39.105.144.217:8089/bishe/file/downloadFile" enctype="multipart/form-data">-->

        <!--</form>-->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="formDailog" class="demo-form-inline" :inline="true">
                <el-form-item label="公告主题" :label-width="formLabelWidth">
                    <el-input size="medium"  v-model="formDailog.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="文件上传" :label-width="formLabelWidth">
                            <!--<el-upload-->
                                    <!--class="upload-demo"-->
                                    <!--action="http://39.105.144.217:8089/bishe/file/upload"-->
                                    <!--:file-list="fileList"-->
                                    <!--:auto-upload="false">-->
                                <!--<el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
                                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                            <!--</el-upload>-->
                            <el-upload
                                    class="upload-demo"
                                    action="http://39.105.144.217:8089/bishe/file/upload"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :on-success = 'successFun'
                                    multiple
                                    :limit="3"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">上传文件不超过500kb</div>
                            </el-upload>
                            <!--<input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg"-->
                                   <!--ref="new_image">-->
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--<el-form-item label="时间" :label-width="formLabelWidth">-->
                    <!--<el-date-picker-->
                            <!--size="medium"-->
                            <!--v-model="formDailog.craete_date "-->
                            <!--type="daterange"-->
                            <!--range-separator="至"-->
                            <!--start-placeholder="开始日期"-->
                            <!--end-placeholder="结束日期">-->
                    <!--</el-date-picker>-->
                <!--</el-form-item>-->
                <el-row class="text">
                    <el-form-item label="公告内容" :label-width="formLabelWidth">
                        <el-input type="textarea" class="textarea" v-model="formDailog.content"></el-input>
                    </el-form-item>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import service from './service'
    export default {
        name: "proclamation",
        data() {
            return {
                fileId:'',
                fileList: [],
                file:null,
                value6:'',
                dialogFormVisible:false,
                page:false,
                title:'修改信息',
                total:0,
                pageSize:10,
                currentPage: 1,
                formInline: {
                    s_name: '',
                    tname: '',
                    value6:''
                },
                formDailog:{
                    title:'',
                    content:''
                },
                statusList:[
                    {
                        label:'未批准',
                        value:0
                    },
                    {
                        label:'批准',
                        value:1
                    }
                ],
                dialogFormVisible: false,
                form: {
                    s_id:'',
                    s_name:'',
                    description:'',
                    state:'',
                    t_id:''
                },
                tableData: [],
                formLabelWidth: '95px',
                haha:'haha'
            }
        },
        methods: {
            successFun(val){
               this.fileId = val.data;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            // 新增
            add(){
                this.dialogFormVisible = true;
            },
            // 点击没页显示多少条
            handleSizeChange(val) {
                this.pageSize = val;
                this.getAnnouncement();
                // console.log(`每页 ${val} 条`);
            },
            // 点击页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getAnnouncement();
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
                service.announcement(obj).then(data => {
                    if(data.data.success){
                        this.tableData = data.data.data.items;
                        
                        this.total = data.data.data.totalNum;
                    }
                })

            },
            // 确定保存
            save(){
                let that = this;
                var date=new Date;
                var year=date.getFullYear();
                var month=date.getMonth()+1;
                var day=date.getDate();
                var hour=date.getHours();
                var min=date.getMinutes();
                var sec=date.getSeconds();
                month =(month<10 ? "0"+month:month);
                day =(day<10 ? "0"+day:day);
                hour =(hour<10 ? "0"+hour:hour);
                min =(min<10 ? "0"+min:min);
                sec =(sec<10 ? "0"+sec:sec);
                var craete_date = year + '-' + month + '-' + day + ' ' + hour + ":" + min + ":" + sec;
                console.log(craete_date)
                let obj = {
                    title:this.formDailog.title,
                    craete_date:craete_date,
                    content:this.formDailog.content,
                    fileid:this.fileId,
                }
                console.log(obj)
                service.uploadAnnouncement(obj).then(data => {
                    console.log(data)
                    if(data.data.code =='200'){
                        this.dialogFormVisible = false;
                        this.formDailog.title = "";
                        this.formDailog.content = '';
                        this.fileList = [];
                        this.fileId = "";
                        this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                        this.onSubmit();
                    }
                })
            },
            //编辑
            handleEdit(index, row) {
                for(var i in row){
                    this.form[i] = row[i];
                }
                console.log(this.form)
                // this.form.tid = row.tid;
                this.title = "修改信息"
                this.dialogFormVisible = true;
            },
            // 批准取消批准操作
            handleState(index, row){
                delete row.teacher;
                if(row.state == 0){
                    row.state = 1
                }else{
                    row.state = 0
                }
                service.update(row).then(data => {
                    if(data.data.success){
                        this.dialogFormVisible = false;
                        this.$message({
                            showClose: true,
                            message: '状态修改成功',
                            type: 'success'
                        });
                        this.getAnnouncement();
                    }
                })
            },
            //删除
            handleDelete(index, row) {
                let data = {
                    id:row.a_id
                }
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    service.deleteAnnouncement(data).then(data => {
                        if(data.data.success){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getAnnouncement();
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
            getAnnouncement(){
                let data= {
                    s_name:this.formInline.s_name,
                    tname:this.formInline.tname,
                    pageNum:this.currentPage,
                    pageSize:this.pageSize
                }
                service.announcement(data).then(data => {
                    if(data.data.success){
                        this.tableData = data.data.data.items;
                        this.total = data.data.data.totalNum;
                    }
                })
            },
            // sort(arr){
            //     var temp;
            //     for(var i=0; i<arr.length;i++) {
            //         for(var j=i+1;j<arr.length;j++) {
            //             if(arr[i]>arr[j]) {
            //                 temp=arr[i];
            //                 arr[i]=arr[j];
            //                 arr[j]=temp;
            //             }
            //         }
            //     }
            //     return arr
            //
            //
            // },
            // 获取教师列表

            //二分查找
            // binarySearch(arr, key) {
            //     // 前提数组必须是有序的 返回对应元素的索引
            //     // arr查找的数组   key 数组里边元素
            //     var low = 0;
            //     var high = arr.length - 1;
            //     while(low <= high){
            //         var mid = parseInt((high + low) / 2);
            //         if(key == arr[mid]){
            //             return  mid;
            //         }else if(key > arr[mid]){
            //             low = mid + 1;
            //         }else if(key < arr[mid]){
            //             high = mid -1;
            //         }else{
            //             return -1;
            //         }
            //     }
            // },
            // fun(){
            //     var Cat = {
            //         name: 'miaomiao',
            //         sex:'man',
            //         sayName: function () {
            //             console.log("my name is " + this.name);
            //         }
            //     };
            //     Cat.sayName();
            // }
        },
        mounted() {
            this.getAnnouncement();
            // let arr = [4,8,2,6,4,9,5,3]
            // let array = this.gettecherList(arr)
            // console.log(array)
            // console.log(this.binarySearch(array,6))
            // this.fun();
        }
    }
</script>
<style>
    .text .el-form-item{
        width: 100%;
    }
    .text .el-form-item .el-form-item__content {
        width: 80%;
    }
</style>
<style scoped>
    .text .el-form-item .el-form-item__content{
        width: 100%;
    }
    .proclamation{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .proclamation-main{
        width: 100%;
        box-sizing: border-box;
        min-height: 100%;
        padding-bottom:40px;
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
</style>