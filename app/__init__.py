from flask import Flask

# 创建Flask应用实例
app = Flask(__name__, static_folder='static', template_folder='templates')

# 确保中文正常显示
app.config['JSON_AS_ASCII'] = False

# 导入视图
from app.views.main import bp as main_bp

# 导入API
from app.api.data import api_bp

# 注册蓝图
app.register_blueprint(main_bp)
app.register_blueprint(api_bp)