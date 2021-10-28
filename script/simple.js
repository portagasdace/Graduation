const simpleGit = require("simple-git");
const path = require("path")
const git = simpleGit()
git.add('./*')
git.commit("提交")
console.log(git.status(), "simpleGit");