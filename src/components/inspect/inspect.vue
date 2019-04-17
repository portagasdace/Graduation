<template>
    <div class="proclamation">
        <div class="proclamation-main">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="staged_achieve"
                        label="阶段成果">
                </el-table-column>
                <el-table-column
                    prop="problem_solve"
                    label="问题解决方案">
                </el-table-column>
                <el-table-column
                        prop="student.name"
                        label="学生姓名">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="文件名">
                        <template slot-scope="scope">
                            <a :href="'http://39.105.144.217:8089/bishe/file/downloadFile?fileName=' +encodeURIComponent(scope.row.file.originalfilename)">{{scope.row.file.originalfilename}}</a>
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
            <!-- <el-dialog :title="title" :visible.sync="dialogFormVisible" width="35%" >
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
            </el-dialog> -->
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
    </div>
</template>

<script>
    import service from './service'
    export default {
        name: "inspect",
        data() {
            return {
                total:0,
                pageSize:10,
                currentPage: 1,
                tableData:[],
                formInline:{}
            }
        },
        methods: {
             // 点击没页显示多少条
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
                // console.log(`每页 ${val} 条`);
            },
            // 点击页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
                // console.log(`当前页: ${val}`);
            },
             //删除
            handleDelete(index, row) {
                console.log(row)
                let data = {
                    id:row.m_id
                }
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    service.deleteMidinspection(data).then(data => {
                        if(data.data.success){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getData();
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            getData(){
                let obj = {};
                for(var i in this.formInline){
                    obj[i] = this.formInline[i];
                }
                obj.pageNum = this.currentPage;
                obj.pageSize = this.pageSize;
                service.midinspection(obj).then(data => {
                    if(data.data.success){
                        this.tableData = data.data.data.items;
                        this.total = data.data.data.totalNum;
                    }
                })
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>

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