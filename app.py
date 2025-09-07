from flask import Flask, jsonify, send_from_directory
import os

# 创建Flask应用实例
app = Flask(__name__, static_folder='.', static_url_path='')

# 确保中文正常显示
app.config['JSON_AS_ASCII'] = False

# API端点 - 返回示例数据
@app.route('/api/data')
def get_data():
    return jsonify({
        'message': 'Hello World!',
        'status': 'success',
        'data': {
            'server_time': '2023-11-11',
            'server_info': 'Flask Server'
        }
    })

# 根路径 - 提供index.html文件
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    # 绑定到0.0.0.0，允许通过公网IP访问
    app.run(host='0.0.0.0', port=5000, debug=True)