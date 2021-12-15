# 安装的依赖解释

## 脚手架初始的依赖

```bash
# 加载和处理配置
@nestjs/config
# 存放过滤器和拦截器等
@nestjs/common
```

## 后续实现功能添加的依赖

```bash
# typeORM操作数据库
@nestjs/typeorm
typeorm
mysql2


# dto校验(类型校验，转换，错误提示)
class-validator
class-transformer

# 配置接口文档Swagger
@nestjs/swagger
swagger-ui-express

# 加密库，加密用户密码
bcryptjs


# 本地验证
@nestjs/passport passport passport-local

# jwt验证
@nestjs/jwt

# 本地验证jwt
passport-jwt

# websocket
@nestjs/platform-socket.io
```

## 词汇

``bash
strategy 策略
strategies 策略组
guard 守卫
authguard 验证守卫
secret 密钥
Bearer 持票人,携带密钥者（token的前缀）
```
