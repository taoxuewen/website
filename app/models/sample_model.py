class SampleModel:
    """示例数据模型类"""
    
    def __init__(self):
        # 初始化示例数据
        self.sample_data = {
            'items': [],
            'metadata': {
                'version': '1.0',
                'last_updated': None
            }
        }
    
    def get_all_items(self):
        """获取所有项目"""
        return self.sample_data['items']
    
    def add_item(self, item):
        """添加新项目"""
        if item not in self.sample_data['items']:
            self.sample_data['items'].append(item)
            self._update_metadata()
            return True
        return False
    
    def remove_item(self, item_index):
        """移除项目"""
        if 0 <= item_index < len(self.sample_data['items']):
            removed_item = self.sample_data['items'].pop(item_index)
            self._update_metadata()
            return removed_item
        return None
    
    def _update_metadata(self):
        """更新元数据"""
        from app.utils.helpers import get_current_timestamp
        self.sample_data['metadata']['last_updated'] = get_current_timestamp()

# 创建单例实例
sample_model = SampleModel()