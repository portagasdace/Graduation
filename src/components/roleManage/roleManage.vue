<template>
  <div class="roleManage">
    <div class="personalInfo-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-row :gutter="20">
          <el-col :span="3">
            <el-form-item label>
              <el-button class="serch" size="medium" type="primary" @click="insert">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="roleDatas" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="role_name" label="角色名称"></el-table-column>
        <el-table-column prop="role_code" label="角色标识"></el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <el-button class="tabBtn" size="mini" type="primary" @click="updataRole(scope.$index, scope.row)">修改</el-button>
            <el-button class="tabBtn" size="mini" type="primary" @click="serchInfo(scope.$index, scope.row)">查看信息</el-button>
            <el-button class="tabBtn" size="mini" type="danger" @click="handleUser(scope.$index, scope.row)">分配用户</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="title" :visible.sync="flags.dialogFormVisible" width="35%" :close-on-click-modal="false">
        <el-form v-show="title == '查看权限信息'" :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="权限：" style="font-weight:bold;" label-width>
            <el-checkbox-group v-model="form.perm">
              <el-row :gutter="20">
                <el-col :span="6" v-for="(item, index) in permList" :key="index">
                  <el-checkbox :label="item.permission" :value="item.id" name="perm"></el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <el-table v-show="title == '分配用户'" :data="role_userDatas" ref="multipleTable" @selection-change="handleSelectionChange" border style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="username" label="用户账号"></el-table-column>
          <el-table-column prop="realname" label="用户真实姓名"></el-table-column>
        </el-table>
        <div v-if="title == '分配用户'" slot="footer" class="dialog-footer">
          <el-button @click="flags.dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="insertOrupdata" :visible.sync="flags.dialogInsertVisible" width="35%" :close-on-click-modal="false">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="角色名称" label-width="100px">
            <el-input class="formBtn" size="medium" v-model="roleForm.role_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色标识" label-width="100px">
            <el-input class="formBtn" size="medium" v-model="roleForm.role_code" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="flags.dialogInsertVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveInsertOrupdata">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import service from './service'
export default {
  name: "roleManage",
  data() {
    return {
      roleDatas: [],
      flags: {
        dialogFormVisible: false,
        dialogInsertVisible: false,
      },
      title: '查看权限信息',
      insertOrupdata: '新增',
      form: {
        perm: []
      },
      roleForm: {
        role_name: '',
        role_code: ''
      },
      permList: [],
      role_userDatas: [],
      multipleSelection: [],
      params: {}
    }
  },
  methods: {
    /**
     * @title 查询角色列表
     */
    async getroleList() {
      const res = await service.roleList();
      if (res.data.code == '200') {
        this.roleDatas = res.data.data;
      }

    },

    /**
     * @title 新增
     */
    insert() {
      this.insertOrupdata = '新增'
      this.flags.dialogInsertVisible = true
      this.roleForm = Object.assign({}, { role_name: '', role_name: '' })

    },

    /**
     * @title 修改
     */
    updataRole(index, row) {
      this.insertOrupdata = '修改'
      this.roleForm = Object.assign({}, { role_name: row.role_name, role_code: row.role_code, rid: row.rid })
      this.flags.dialogInsertVisible = true
    },

    /**
     * @title 新增修改保存事件
     */
    async saveInsertOrupdata() {
      let obj = Object.assign({}, this.roleForm);
      const res = await service.saveOrUpdate(obj);
      let message = ""
      switch (this.insertOrupdata) {
        case "新增":
          message = '添加成功'
          break;
        case "修改":
          message = '修改成功'
          break;
      }
      if (res.data.success) {
        this.$message({
          showClose: true,
          message: message,
          type: 'success'
        });
        this.flags.dialogInsertVisible = false
        this.getroleList();
      }
    },

    /**
     * @title 查询角色信息
     */
    async serchInfo(index, row) {
      this.title = '查看权限信息';
      const res = await service.rolePerm({ id: row.rid });
      if (res.data.code == '200') {
        this.form.perm = [];
        this.permList = res.data.data;
        this.permList.map(k => {
          if (k.role !== null) {
            this.form.perm.push(k.permission)
          }
        })
      }
      this.flags.dialogFormVisible = true;
    },

    /**
     * @title 分配用户
     */
    async handleUser(index, row) {
      this.params = Object.assign({}, { rid: row.rid })
      this.title = '分配用户';
      const res = await service.roleUser({ id: row.rid });
      let _arr = [];
      if (res.data.code == '200') {
        this.role_userDatas = res.data.data;
        this.role_userDatas.map(k => {
          if (k.roles.length !== 0) {
            _arr.push(k)
          }
        })
      }
      this.toggleSelection(_arr)
      this.flags.dialogFormVisible = true;
    },

    /**
     * @title 控制分配用户弹窗是否是勾选状态
     */
    toggleSelection(rows) {
      let that = this;
      this.$nextTick(item => {
        if (rows) {
          rows.forEach(row => {
            that.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      })
    },

    /**
     * @title 分配用户表格复选框点击事件
     */
    handleSelectionChange(val) {
      const idArr = val.map(k => { return k.id })
      this.params = Object.assign({}, this.params, { uids: idArr.join(',') })
    },

    /**
     * @title 弹框保存
     */
    async save() {
      const res = await service.assign(this.params);
      if (res.data.code == '200') {
        this.$message({
          showClose: true,
          message: '分配用户成功',
          type: 'success'
        });
        this.flags.dialogFormVisible = false;
      }
    }
  },
  mounted() {
    this.getroleList();
  }
}
</script>
<style>
.roleManage .el-dialog__body {
  padding-top: 0px !important;
}
</style>

<style scoped>
</style>