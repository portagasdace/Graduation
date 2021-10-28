<template>
  <div>
    <div v-for="(item, index) in dataList" :key="index">
      <el-input style="width:200px"></el-input>
      <el-button @click="add(item, index)">add</el-button>
      <div style="margin-left:20px;">
        <div v-for="(child, indexChild) in item.children" :key="indexChild">
          <el-input style="width:200px"></el-input>
          <el-button @click="add(item, index)">add</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [{ children: [] }]
    };
  },
  methods: {
    add(item, index) {
      this.dataList[index].children.push(index + 2);
    },
  }
};
</script>
