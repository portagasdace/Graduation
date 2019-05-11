<template>
  <div class="progress">
    <el-form id="myForm" :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item>
            <el-button class="serch" size="medium" type="primary" @click="add">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="进度名称"></el-table-column>
      <el-table-column prop="time" label="截止时间"></el-table-column>
      <el-table-column prop="sort" label="排序值"></el-table-column>
      <el-table-column prop label="操作">
        <template slot-scope="scope">
          <el-button class="tabBtn" size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button class="tabBtn" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="35%">
      <el-form :inline="true" :model="form" :rules="rules" ref="form" class="demo-form-inline">
        <el-form-item label="进度名称" :label-width="formLabelWidth" prop="name">
          <el-input class="formBtn" size="medium" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="截止时间" :label-width="formLabelWidth" prop="time">
          <el-date-picker v-model="form.time" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="排序值" :label-width="formLabelWidth" prop="sort">
          <el-input class="formBtn" size="medium" v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
        <br>
        <span style="color:#6d5a5a;margin-left:95px;">*该排序值可能影响整个进度的排序顺序</span>
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
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      formInline: {},
      formLabelWidth: '95px',
      form: {
        name: '',
        time: '',
        sort: ''
      },
      rules: {
        sort: [{
          type: 'number',
          trigger: 'change',
          required: true,
          message: '必须为数字值',

          // 解决方案：在rules 中验证这个功能的时候，对填写的数值进行判断
          transform(value) {
            if (value != '') {
              return Number(value)
            }

          }
        }],
        name: [{ trigger: 'change', required: true, message: '必填' }],
        time: [{ trigger: 'change', required: true, message: '必填' }],
      },
      title: '新增'
    }
  },
  methods: {
    /**
     * @titile 初始化
     */
    init() {
      this.getdatas()
    },

    /**
     * @titile 请求进度列表
     */
    getdatas() {
      service.process().then(data => {
        this.tableData = data.data.data

      })
    },

    /**
     * @title 新增
     */
    add() {
      this.form = Object.assign({}, { name: '', time: '', sort: '' })
      this.dialogFormVisible = true;
      this.title = '新增'

    },

    /**
     * @title 编辑
     */
    handleEdit(index, row) {
      this.title = '编辑'
      this.dialogFormVisible = true;
      const { name, time, sort, id } = row
      this.form = Object.assign({}, { name, time, sort, id })
    },

    /**
     * @title 保存
     */
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let obj = Object.assign({}, this.form);
          service.saveOrUpdate(obj).then(data => {
            if (data.data.success) {
              this.title == '新增' && this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              });
              this.title == '编辑' && this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              });
              this.$refs['form'].resetFields();
              this.dialogFormVisible = false;
              this.init();
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },

    /**
     * @title 删除
     */
    handleDelete(index, row) {
      let data = {
        id: row.id
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.deleteProcess(data).then(data => {
          if (data.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.init();
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
  },
  mounted() {
    this.init()
  }
}
</script>
<style scoped>
</style>


