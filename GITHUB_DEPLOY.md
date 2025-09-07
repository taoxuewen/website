# GitHub 远程仓库推送教程

本教程将指导你如何将本地项目推送到 GitHub 远程仓库。

## 前提条件
- 已安装 Git（可通过 `git --version` 检查）
- 已注册 GitHub 账号
- 本地项目已完成开发

## 步骤 1：配置 Git 用户名和邮箱

首次使用 Git 时，需要配置全局用户名和邮箱：

```bash
# 配置全局用户名
git config --global user.name "你的GitHub用户名"

# 配置全局邮箱（建议使用GitHub注册邮箱）
git config --global user.email "你的邮箱地址"

# 查看配置是否成功
git config --list
```

## 步骤 2：初始化本地 Git 仓库（如已初始化可跳过）

如果你的项目还没有初始化 Git 仓库，请执行以下命令：

```bash
# 进入项目根目录
cd /root/workspace/website

# 初始化 Git 仓库
git init
```

## 步骤 3：创建 .gitignore 文件（如已有可跳过）

为避免将不必要的文件推送到远程仓库，创建 `.gitignore` 文件：

```bash
# 使用 touch 命令创建文件
touch .gitignore
```

在 `.gitignore` 文件中添加以下内容（根据项目需求可调整）：

```
# Python 项目通用忽略规则
__pycache__/
*.py[cod]
*$py.class

# 虚拟环境
venv/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# 日志文件
*.log

# 操作系统文件
.DS_Store
Thumbs.db

# IDE 配置
.vscode/
.idea/
*.swp
*.swo
*\~

# 构建产物
build/
dist/
*.egg-info/

# 测试覆盖
.coverage
htmlcov/

# 临时文件
*.tmp
*.temp
.cache/
```

## 步骤 4：将文件添加到暂存区

```bash
# 添加所有文件到暂存区（不包括 .gitignore 中指定的文件）
git add .

# 或添加特定文件
git add 文件名
```

## 步骤 5：提交更改

```bash
git commit -m "初始提交"  # 替换为有意义的提交信息
```

## 步骤 6：在 GitHub 上创建新仓库

1. 登录 GitHub 账号
2. 点击右上角的 "+" 图标，选择 "New repository"
3. 填写仓库名称（建议与本地项目名称一致）
4. 选择仓库可见性（公开或私有）
5. 不要勾选 "Initialize this repository with a README"（因为我们已有本地项目）
6. 点击 "Create repository"

## 步骤 7：关联本地仓库和远程仓库

创建远程仓库后，GitHub 会显示仓库的 URL。复制 HTTPS 或 SSH URL，然后执行以下命令：

```bash
# 使用 HTTPS URL
git remote add origin https://github.com/你的用户名/仓库名.git

# 或使用 SSH URL（推荐，需要配置 SSH 密钥）
git remote add origin git@github.com:你的用户名/仓库名.git
```

## 步骤 8：生成和配置 SSH 密钥（推荐，可选）

使用 SSH 连接可以避免每次推送都输入密码。以下是配置步骤：

```bash
# 生成 SSH 密钥（一路按回车使用默认值）
ssh-keygen -t ed25519 -C "你的邮箱地址"

# 查看公钥内容
cat ~/.ssh/id_ed25519.pub
```

复制输出的公钥内容，然后：
1. 登录 GitHub，点击右上角头像，选择 "Settings"
2. 点击左侧菜单中的 "SSH and GPG keys"
3. 点击 "New SSH key"
4. 在 "Title" 中输入一个标识名称
5. 在 "Key" 中粘贴刚才复制的公钥内容
6. 点击 "Add SSH key"

## 步骤 9：推送代码到远程仓库

```bash
# 推送到远程仓库的 main 分支
git push -u origin main


# 如果远程仓库的默认分支是 master
git push -u origin master
```

`-u` 参数会将本地分支与远程分支关联，后续推送可以直接使用 `git push` 命令。

## 步骤 10：验证推送是否成功

访问你在 GitHub 上创建的仓库页面，检查文件是否已成功推送。

## 常见问题解决

1. **推送失败提示权限问题**：
   - 检查 SSH 密钥是否正确配置
   - 或使用 HTTPS URL 并确保输入了正确的 GitHub 用户名和密码（可能需要使用个人访问令牌）

2. **本地和远程仓库冲突**：
   ```bash
   # 先拉取远程仓库的更改
   git pull origin main --allow-unrelated-histories
   # 解决冲突后重新提交和推送
   git add .
   git commit -m "解决冲突"
   git push origin main
   ```

3. **创建个人访问令牌（替代密码）**：
   - 登录 GitHub，进入 Settings > Developer settings > Personal access tokens > Generate new token
   - 选择所需的权限，生成令牌并保存（只显示一次）
   - 使用时，用户名输入 GitHub 用户名，密码输入个人访问令牌

## 后续工作流

完成首次推送后，日常开发流程如下：

```bash
# 1. 开发新功能或修复 bug

# 2. 查看修改的文件
git status

# 3. 添加更改到暂存区
git add .

# 4. 提交更改
git commit -m "描述你的更改"

# 5. 推送更改到远程仓库
git push
```

希望本教程能帮助你成功将项目推送到 GitHub！如有任何问题，请查阅 [GitHub 官方文档](https://docs.github.com/zh) 或在评论区留言。