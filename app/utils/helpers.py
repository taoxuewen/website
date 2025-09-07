import datetime
import logging
import os

# 配置日志
def setup_logger(name, log_file, level=logging.INFO):
    """设置日志记录器"""
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    handler = logging.FileHandler(log_file)
    handler.setFormatter(formatter)
    
    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(handler)
    
    return logger

# 获取当前时间戳
def get_current_timestamp():
    """获取当前时间的时间戳字符串"""
    return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

# 检查目录是否存在，如果不存在则创建
def ensure_directory_exists(directory):
    """确保目录存在"""
    if not os.path.exists(directory):
        os.makedirs(directory)

# 格式化响应数据
def format_response(success=True, message='', data=None):
    """格式化API响应数据"""
    return {
        'success': success,
        'message': message,
        'data': data,
        'timestamp': get_current_timestamp()
    }