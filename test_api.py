import requests
import json

def test_api_endpoints():
    print("开始测试API端点...")
    
    # 测试基础URL
    base_url = "http://localhost"
    
    # 测试首页
    print("\n测试首页...")
    try:
        response = requests.get(f"{base_url}")
        print(f"首页状态码: {response.status_code}")
        print(f"首页响应长度: {len(response.text)} 字符")
    except Exception as e:
        print(f"访问首页失败: {str(e)}")
    
    # 测试数据API
    print("\n测试数据API...")
    try:
        response = requests.get(f"{base_url}/api/data")
        print(f"数据API状态码: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"数据API响应: {json.dumps(data, ensure_ascii=False, indent=2)}")
    except Exception as e:
        print(f"访问数据API失败: {str(e)}")
    
    # 测试项目API - 获取所有项目
    print("\n测试项目API - 获取所有项目...")
    try:
        response = requests.get(f"{base_url}/api/items")
        print(f"获取项目状态码: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"获取项目响应: {json.dumps(data, ensure_ascii=False, indent=2)}")
    except Exception as e:
        print(f"访问项目API失败: {str(e)}")
    
    # 测试项目API - 添加项目
    print("\n测试项目API - 添加项目...")
    try:
        test_item = "测试项目_" + str(int(time.time()))
        response = requests.post(f"{base_url}/api/add-item/{test_item}")
        print(f"添加项目状态码: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"添加项目响应: {json.dumps(data, ensure_ascii=False, indent=2)}")
    except Exception as e:
        print(f"添加项目失败: {str(e)}")
    
    print("\nAPI端点测试完成！")

if __name__ == "__main__":
    import time
    test_api_endpoints()