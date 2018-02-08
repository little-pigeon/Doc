## 本地操作
git add 文件名 （提交到本地暂存）
git commit -m 提交说明 （提交到本地）

## 远程操作
git pull （拉取）
git push （推送）
git remote -v (查看远程库信息，如果没有push权限，则只能看到fetch信息)

## 查看git指令操作后的状态
git status

## 分支处理
git checkout -b 分支名 （创建并切换分支）

git merge 分支名 （合并分支）
git merge --no-ff -m "合并说明" 分支名 （合并分支并保留了合并后的历史）

git branch -d 分支名 （删除本地分支）
git branch -D 分支名 （强制删除没有合并过的本地分支）
git push origin :分支名 （删除远程仓库分支）

### 处理bug
git status （创建并保存临时的工作现场）
git stash list （查看保存的临时工作现场）
git stash apply （恢复到临时的工作现场的状态）
git stash drop （删除掉stash内容）
git stash pop （恢复到临时的工作现场的状态，同时删除掉stash内容）

## 历史版本回退
git reset --hard commit-id :回滚到commit-id，讲commit-id之后提交的commit都去除
git reset --hard HEAD~3：将最近3次的提交回滚