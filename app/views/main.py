from flask import Blueprint, render_template, send_from_directory, jsonify
import os

# 创建main蓝图
bp = Blueprint('main', __name__)

# 导入模型
from app.models.sample_model import sample_model

@bp.route('/')
def index():
    # 返回首页模板
    return render_template('index.html')

@bp.route('/static/<path:filename>')
def static_files(filename):
    # 提供静态文件服务
    static_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static')
    return send_from_directory(static_dir, filename)

@bp.route('/api/items', methods=['GET'])
def get_items():
    """获取所有项目"""
    items = sample_model.get_all_items()
    return jsonify({
        'success': True,
        'data': items,
        'count': len(items)
    })

@bp.route('/api/add-item/<item>', methods=['POST'])
def add_item(item):
    """添加新项目"""
    result = sample_model.add_item(item)
    if result:
        return jsonify({
            'success': True,
            'message': '项目添加成功',
            'item': item
        })
    else:
        return jsonify({
            'success': False,
            'message': '项目已存在'
        }), 400

@bp.route('/api/remove-item/<int:index>', methods=['DELETE'])
def remove_item(index):
    """移除项目"""
    removed_item = sample_model.remove_item(index)
    if removed_item:
        return jsonify({
            'success': True,
            'message': '项目移除成功',
            'item': removed_item
        })
    else:
        return jsonify({
            'success': False,
            'message': '项目索引无效'
        }), 404