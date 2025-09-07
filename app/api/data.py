from flask import Blueprint, jsonify
import datetime

# 创建API蓝图
api_bp = Blueprint('api', __name__)

@api_bp.route('/api/data')
def get_data():
    # 返回一些示例数据
    return jsonify({
        'time': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'message': 'Hello from Flask API!',
        'status': 'success'
    })

# 导出蓝图供其他模块使用
bp = api_bp