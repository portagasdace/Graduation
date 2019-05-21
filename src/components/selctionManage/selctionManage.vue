<template>
  <div class="personalInfo">
    <div class="personalInfo-main">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="课题名称">
              <el-input size="medium" v-model="formInline.name" placeholder="课题名称"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">-->
          <!--<el-form-item label="教师姓名">-->
          <!--<el-input size="medium" v-model="formInline.tname" placeholder="教师姓名"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="8">
            <el-button class="serch" size="medium" type="primary" style="float: right" @click="onSubmit">查询</el-button>
          </el-col>
          <el-col :span="2" style="padding-top:6px;">
            <a style="dispaly:blcok;text-decoration: none;
                padding:9px 20px;
                margin-top:5px;
                cursor:pointer;
                font-size: 14px;
                border-radius: 4px;
                color:#fff;margin-left:15px;    color: #fff;
                background-color: #409EFF;
                border-color: #409EFF;" @click="export_btn()">导出</a>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="subjectInformation.s_name" label="课题名称"></el-table-column>
        <el-table-column prop="student.number" label="学生学号"></el-table-column>
        <el-table-column prop="student.name" label="学生姓名"></el-table-column>
        <el-table-column prop="reply_grade" label="成绩"></el-table-column>
        <el-table-column prop="sel_state" label="批准状态"></el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <el-button class="tabBtn" size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button class="tabBtn" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button v-if="scope.row.sel_state == '未批准'" class="tabBtn" size="mini" type="success" @click="handleState(scope.$index, scope.row)">批准</el-button>
            <el-button v-else="scope.row.sel_state == '批准'" class="tabBtn" size="mini" type="ifon" @click="handleState(scope.$index, scope.row)">取消批准</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="title" :visible.sync="dialogFormVisible" width="35%">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="成绩" :label-width="formLabelWidth">
            <el-input class="formBtn" size="medium" v-model="form.reply_grade" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-select size="medium" v-model="form.sel_state" placeholder="请选择">
              <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="教师姓名" :label-width="formLabelWidth">-->
          <!--<el-input class="formBtn" disabled size="medium" v-model="form.teacherName" autocomplete="off"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-row class="text">-->
          <!--<el-form-item label="课题描述" :label-width="formLabelWidth">-->
          <!--<el-input type="textarea" class="textarea" v-model="form.description"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-row>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 4, 6, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>
<script>
import service from './service'
export default {
  name: "selctionManage",
  data() {
    return {
      page: false,
      title: '修改信息',
      total: 0,
      pageSize: 10,
      currentPage: 1,
      formInline: {
        name: '',
        // tname: '',
      },
      statusList: [
        {
          label: '未批准',
          value: 0
        },
        {
          label: '批准',
          value: 1
        }
      ],
      dialogFormVisible: false,
      form: {
        s_id: '', // 学生id
        id: '', // 选题id
        titleId: '',//课题id
        reply_grade: '',
        sel_state: '',
      },
      tableData: [],
      formLabelWidth: '95px'
    }
  },
  methods: {
    // 导出
    export_btn() {
      console.log(11)
      this.$confirm('确定将全部选题信息导出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.location.href = 'http://39.105.144.217:8089/bishe/topicselectioninformation/export'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消导出'
        });
      });
    },
    // 点击没页显示多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getsubjectSelection();
      // console.log(`每页 ${val} 条`);
    },
    // 点击页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getsubjectSelection();
      // console.log(`当前页: ${val}`);
    },
    // 查询
    onSubmit() {
      let obj = {};
      for (var i in this.formInline) {
        obj[i] = this.formInline[i];
      }
      obj.pageNum = this.currentPage;
      obj.pageSize = this.pageSize;
      service.subjectSelection(obj).then(data => {
        if (data.data.success) {
          this.tableData = data.data.data.items;
          this.total = data.data.data.totalNum;
        }
      })

    },
    // 确定保存
    save() {
      let obj = {};
      for (var i in this.form) {
        obj[i] = this.form[i];
      }
      delete obj.student;
      delete obj.subjectInformation;
      service.update(obj).then(data => {
        if (data.data.success) {
          this.dialogFormVisible = false;
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          });
          this.getsubjectSelection();
        }
      })
    },
    //编辑
    handleEdit(index, row) {
      console.log(row)
      for (var i in row) {
        this.form[i] = row[i];
      }
      console.log(this.form)
      // this.form.tid = row.tid;
      this.title = "修改信息"
      this.dialogFormVisible = true;
    },
    // 批准取消批准操作
    handleState(index, row) {
      delete row.student;
      delete row.subjectInformation;
      console.log(row)
      if (row.sel_state == '批准') {
        row.sel_state = 0
      } else {
        row.sel_state = 1
      }
      service.update(row).then(data => {
        if (data.data.success) {
          this.dialogFormVisible = false;
          this.$message({
            showClose: true,
            message: '状态修改成功',
            type: 'success'
          });
          this.getsubjectSelection();
        }
      })
    },
    //删除
    handleDelete(index, row) {
      let data = {
        id: row.s_id
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.deleteSubject(data).then(data => {
          if (data.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getsubjectSelection();
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
    getsubjectSelection() {
      let data = {
        name: this.formInline.name,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      service.subjectSelection(data).then(data => {
        if (data.data.success) {
          this.tableData = data.data.data.items;
          this.total = data.data.data.totalNum;
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].sel_state == '0') {
              this.tableData[i].sel_state = '未批准'
            } else {
              this.tableData[i].sel_state = '批准'
            }
          }
        }
      })
    },
  },
  mounted() {
    this.getsubjectSelection();
  }
}
</script>
<style>
.text .el-form-item {
  width: 100%;
}
.text .el-form-item .el-form-item__content {
  width: 80%;
}
</style>
<style scoped>
.text .el-form-item .el-form-item__content {
  width: 100%;
}
.personalInfo {
  position: relative;
  width: 100%;
  height: 100%;
}
.personalInfo-main {
  width: 100%;
  box-sizing: border-box;
  min-height: 100%;
  padding-bottom: 40px;
}
.footer {
  /*width: 100%;*/
  margin-top: -40px;
  position: absolute;
  left: -20px;
  right: -20px;
  padding-right: 30px;
  padding-top: 15px;
  background-color: #fff;
  color: #333;
  line-height: 40px;
}
.tabBtn {
  padding: 5px 9px !important;
}
.formBtn {
  width: 200px;
}
.serch {
  /*padding: 8px 15px !important;*/
}
</style>