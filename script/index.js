const path = require("path");
const fs = require("fs");
const basePath = path.resolve(__dirname, "../");
const glob = require('glob')
const datas = glob.sync(`${basePath}/src/**/*.vue`)
console.log(datas, 'datas----')
const getFile = (pathUrl) => {
  // 获取项目文件夹内容
  const files = fs.readdirSync(pathUrl);
  files.map((item, index) => {
    // 判断是文件夹还是文件
    const itemPath = path.resolve(`${pathUrl}`, `./${item}`);
    const stat = fs.lstatSync(itemPath);
    const flag = stat.isFile();
    // 获取文件后缀
    const extname = path.extname(itemPath);
    if (flag) {
      // 不是vue文件返回
      if (extname !== ".vue") {
        return;
      }
      // 满足条件读取vue文件内容
      const data = fs.readFileSync(itemPath);
      // 内容替换
      let str = data.toString();
      var reg = /{{\$t(.*?)}}/;
      str = str.replace(reg, "{1111}");
      // 重新写入文件
      fs.writeFile(itemPath, str, function (err) {
        if (!err) {
          console.log(`${pathUrl}/${item} —— 文件写入成功`);
        }
      });
    } else {
      getFile(itemPath);
    }
  });
};
// getFile(basePath);
