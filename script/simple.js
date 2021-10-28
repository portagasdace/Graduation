const simpleGit = require("simple-git");
const path = require("path");
const { pushd } = require("shelljs");
const git = simpleGit()
git.add('./*')
git.commit("提交")
git.push()
console.log(git.status(), "simpleGit");