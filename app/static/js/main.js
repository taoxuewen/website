// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 动态加载API测试脚本
    const script = document.createElement('script');
    script.src = '/static/js/api_test.js';
    script.onload = function() {
        console.log('API测试脚本加载完成');
    };
    document.head.appendChild(script);
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('nav a');
    
    // 为导航链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 可以在这里添加导航逻辑
            console.log('导航到: ' + this.getAttribute('href'));
        });
    });
    
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // 表单提交处理
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里可以添加表单验证和提交逻辑
            console.log('表单提交: ' + this.getAttribute('action'));
            
            // 示例: 获取表单数据
            const formData = new FormData(this);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            console.log('表单数据:', formDataObj);
        });
    });
    
    // 示例: 获取API数据的函数
    async function fetchItems() {
        try {
            const response = await fetch('/api/items');
            const data = await response.json();
            
            if (data.success) {
                console.log('获取到的项目:', data.data);
                // 这里可以添加处理数据的逻辑
                displayItems(data.data);
            } else {
                console.error('获取项目失败:', data.message);
            }
        } catch (error) {
            console.error('获取数据时发生错误:', error);
        }
    }
    
    // 示例: 显示项目的函数
    function displayItems(items) {
        const itemsContainer = document.getElementById('items-container');
        if (!itemsContainer) return;
        
        itemsContainer.innerHTML = '';
        
        if (items.length === 0) {
            itemsContainer.innerHTML = '<p>暂无项目</p>';
            return;
        }
        
        const ul = document.createElement('ul');
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;
            
            // 添加删除按钮
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '删除';
            deleteBtn.classList.add('secondary');
            deleteBtn.addEventListener('click', function() {
                deleteItem(index);
            });
            
            li.appendChild(deleteBtn);
            ul.appendChild(li);
        });
        
        itemsContainer.appendChild(ul);
    }
    
    // 示例: 添加项目的函数
    async function addItem(item) {
        try {
            const response = await fetch(`/api/add-item/${encodeURIComponent(item)}`, {
                method: 'POST'
            });
            const data = await response.json();
            
            if (data.success) {
                console.log('添加项目成功:', data.item);
                // 重新获取并显示项目列表
                fetchItems();
            } else {
                console.error('添加项目失败:', data.message);
                alert(data.message);
            }
        } catch (error) {
            console.error('添加项目时发生错误:', error);
        }
    }
    
    // 示例: 删除项目的函数
    async function deleteItem(index) {
        try {
            const response = await fetch(`/api/remove-item/${index}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            
            if (data.success) {
                console.log('删除项目成功:', data.item);
                // 重新获取并显示项目列表
                fetchItems();
            } else {
                console.error('删除项目失败:', data.message);
                alert(data.message);
            }
        } catch (error) {
            console.error('删除项目时发生错误:', error);
        }
    }
    
    // 示例: 为添加项目按钮添加事件监听
    const addItemBtn = document.getElementById('add-item-btn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', function() {
            const itemInput = document.getElementById('item-input');
            if (itemInput && itemInput.value.trim()) {
                addItem(itemInput.value.trim());
                itemInput.value = '';
            } else {
                alert('请输入项目内容');
            }
        });
    }
    
    // 示例: 页面加载时获取项目列表
    fetchItems();
    
    // 工具函数: 显示消息通知
    window.showNotification = function(message, type = 'info') {
        // 检查是否已存在通知容器
        let notificationContainer = document.getElementById('notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'notification-container';
            notificationContainer.style.position = 'fixed';
            notificationContainer.style.top = '20px';
            notificationContainer.style.right = '20px';
            notificationContainer.style.zIndex = '10000';
            document.body.appendChild(notificationContainer);
        }
        
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // 设置样式
        notification.style.padding = '12px 20px';
        notification.style.marginBottom = '10px';
        notification.style.borderRadius = '4px';
        notification.style.color = 'white';
        notification.style.fontWeight = '500';
        notification.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
        notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        notification.style.transform = 'translateX(100%)';
        
        // 根据类型设置背景色
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#2ecc71';
                break;
            case 'error':
                notification.style.backgroundColor = '#e74c3c';
                break;
            case 'warning':
                notification.style.backgroundColor = '#f39c12';
                break;
            default:
                notification.style.backgroundColor = '#3498db';
        }
        
        // 添加到容器
        notificationContainer.appendChild(notification);
        
        // 显示通知
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // 3秒后隐藏通知
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            
            // 移除元素
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };
});