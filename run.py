from app import app

if __name__ == '__main__':
    # 绑定到0.0.0.0，使用80端口，允许通过公网IP访问
    app.run(host='0.0.0.0', port=80, debug=True)