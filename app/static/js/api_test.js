// API测试脚本

// 获取服务器数据
async function testGetData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        
        console.log('API数据响应:', data);
        
        if (window.showNotification) {
            window.showNotification('成功获取服务器数据', 'success');
        }
        
        return data;
    } catch (error) {
        console.error('获取数据时发生错误:', error);
        
        if (window.showNotification) {
            window.showNotification('获取数据失败: ' + error.message, 'error');
        }
        
        return null;
    }
}

// 测试项目API
async function testItemsAPI() {
    try {
        // 测试获取所有项目
        const getResponse = await fetch('/api/items');
        const getResult = await getResponse.json();
        
        console.log('获取项目列表:', getResult);
        
        // 测试添加项目
        const testItem = '测试项目 ' + new Date().getTime();
        const addResponse = await fetch(`/api/add-item/${encodeURIComponent(testItem)}`, {
            method: 'POST'
        });
        const addResult = await addResponse.json();
        
        console.log('添加项目结果:', addResult);
        
        if (addResult.success) {
            // 如果添加成功，测试删除项目
            const afterAddResponse = await fetch('/api/items');
            const afterAddResult = await afterAddResponse.json();
            
            if (afterAddResult.data && afterAddResult.data.length > 0) {
                const lastItemIndex = afterAddResult.data.length - 1;
                
                const deleteResponse = await fetch(`/api/remove-item/${lastItemIndex}`, {
                    method: 'DELETE'
                });
                
                const deleteResult = await deleteResponse.json();
                console.log('删除项目结果:', deleteResult);
            }
        }
        
        if (window.showNotification) {
            window.showNotification('项目API测试完成', 'success');
        }
        
    } catch (error) {
        console.error('项目API测试时发生错误:', error);
        
        if (window.showNotification) {
            window.showNotification('项目API测试失败: ' + error.message, 'error');
        }
    }
}

// 表单提交测试
async function submitContactForm(formData) {
    try {
        // 在实际应用中，这里应该发送表单数据到服务器
        console.log('表单数据:', formData);
        
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (window.showNotification) {
            window.showNotification('表单提交成功，感谢您的留言', 'success');
        }
        
        return { success: true, message: '表单提交成功' };
    } catch (error) {
        console.error('表单提交时发生错误:', error);
        
        if (window.showNotification) {
            window.showNotification('表单提交失败: ' + error.message, 'error');
        }
        
        return { success: false, message: '表单提交失败' };
    }
}

// 导出函数供其他脚本使用
window.apiTest = {
    testGetData,
    testItemsAPI,
    submitContactForm
};