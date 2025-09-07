# 简易网站项目

这是一个使用Flask框架构建的模块化网站项目，采用了MVC（模型-视图-控制器）架构模式，方便后续功能扩展和维护。

## 项目结构

```
website/
├── app/
│   ├── __init__.py         # 应用初始化文件
│   ├── views/              # 视图函数目录
│   │   ├── __init__.py
│   │   └── main.py         # 主视图函数
│   ├── api/                # API路由目录
│   │   ├── __init__.py
│   │   └── data.py         # 数据API
│   ├── models/             # 数据模型目录
│   │   ├── __init__.py
│   │   └── sample_model.py # 示例数据模型
│   ├── utils/              # 工具函数目录
│   │   ├── __init__.py
│   │   └── helpers.py      # 通用帮助函数
│   ├── templates/          # HTML模板目录
│   │   └── index.html      # 主页面模板
│   └── static/             # 静态文件目录
│       ├── css/            # CSS样式文件
│       │   └── main.css    # 主样式文件
│       ├── js/             # JavaScript文件
│       │   ├── main.js     # 主JavaScript文件
│       │   └── api_test.js # API测试脚本
│       └── images/         # 图片文件
├── run.py                  # 应用入口文件
├── requirements.txt        # 项目依赖
└── .gitignore              # Git忽略配置
```

## 功能说明

1. **应用初始化**：
   - `app/__init__.py` - 创建Flask应用实例，配置JSON中文显示，注册蓝图

2. **视图函数**：
   - `app/views/main.py` - 处理网站页面请求，包括首页和项目管理API

3. **API路由**：
   - `app/api/data.py` - 提供数据API，返回服务器信息

4. **数据模型**：
   - `app/models/sample_model.py` - 示例数据模型，用于管理项目列表

5. **工具函数**：
   - `app/utils/helpers.py` - 提供通用工具函数，如日志配置、时间戳生成等

6. **静态资源**：
   - `app/static/css/main.css` - 定义网站样式
   - `app/static/js/main.js` - 实现前端交互逻辑
   - `app/static/js/api_test.js` - 提供API测试功能

## 如何运行

1. 克隆仓库：
   ```
   git clone <仓库地址>
   cd website
   ```

2. 安装依赖：
   ```
   pip install -r requirements.txt
   ```

3. 运行应用：
   ```
   python run.py
   ```

4. 访问网站：
   打开浏览器，访问 `http://localhost` 或服务器的IP地址

5. 开发模式：
   默认情况下，应用以调试模式运行，可以自动重载代码变更

6. 生产部署：
   建议使用Gunicorn或uWSGI配合Nginx进行生产环境部署
   ```
   gunicorn -w 4 -b 0.0.0.0:8000 "app:create_app()"
   ```

## 如何扩展

### 添加新的页面

1. 在 `app/templates/` 目录下创建新的HTML模板文件

2. 在 `app/views/main.py` 中添加新的路由函数：
   ```python
   @main.route('/new-page')
   def new_page():
       return render_template('new_page.html')
   ```

### 添加新的API端点

1. 在 `app/api/` 目录下创建新的API文件，例如 `new_api.py`

2. 在 `app/__init__.py` 中导入并注册新的API蓝图：
   ```python
   from app.api.new_api import new_api_bp
   app.register_blueprint(new_api_bp)
   ```

### 添加新的数据模型

1. 在 `app/models/` 目录下创建新的模型文件，例如 `new_model.py`

2. 在需要使用模型的地方导入：
   ```python
   from app.models.new_model import new_model
   ```

### 添加新的静态资源

1. 将CSS文件添加到 `app/static/css/` 目录
2. 将JavaScript文件添加到 `app/static/js/` 目录
3. 将图片文件添加到 `app/static/images/` 目录
4. 在HTML模板中引用新的静态资源

## 开发注意事项

1. 确保所有的文件和函数命名遵循Python的命名规范
2. 在添加新功能前，先了解现有的代码结构和设计模式
3. 为新添加的代码编写适当的注释和文档
4. 在修改现有代码时，确保不会破坏已有的功能
5. 使用Git进行版本控制，定期提交代码更改

## 部署建议

1. 在生产环境中，建议使用Gunicorn或uWSGI作为WSGI服务器
2. 配置反向代理服务器（如Nginx）处理静态文件和负载均衡
3. 设置适当的环境变量来管理配置信息
4. 考虑使用数据库迁移工具（如Flask-Migrate）管理数据库结构变更
5. 定期备份重要数据和配置