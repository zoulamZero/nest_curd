# 安装的依赖解释

## 脚手架初始的依赖

```bash
# 加载和处理配置
@nestjs/config
@nestjs/common
@nestjs/core
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
# 包含以下api @SubscribeMessage() 订阅消息 @MessageBody() 消息体
@nestjs/websockets

@nestjs/platform-socket.io
```

### @nestjs/common 介绍

> 0、@Module() 模块装饰器 [app.module.ts](./src/app.module.ts)
> 传入对象参数，分别有四个属性(都是数组类型)：
>
> `controllers`, 路由
>
> `providers`: 各种类型的 Service(特殊的 service 在配置中开启了 global 后就能在任何 module 下使用)，Gateway，Strategy（验证策略）
>
> `imports` : 引入别的文件暴露的模块，数据库模块，配置模块，http 模块，校验模块……，导入之后就能顺利使用模块下的 service
>
> `exports` : 向外暴露模块

> 1、存放路由
>
> 传入的参数会被拼接成 url 支持正则和 :id 携带信息
>
> @Controller() @Get() 如： [posts.controller.ts](./src/posts/posts.controller.ts)
> 当然也可以在[main.ts](./src/main.ts)设置 `app.setGlobalPrefix('api');`添加路由前缀。

> 2、@Injectable() 修饰 service 和 Interceptor
>
> 如:[transform.interceptor.ts](./src/core/interceptor/transform.interceptor.ts)，用于格式化响应信息的基本格式。

> 3、存放过滤器和拦截器等，
>
> 【优先级低】`app.useGlobalPipes(new ValidationPipe());` 用于做数据验证和根据 dto 返回错误信息， 配合 `class-validator class-transformer` 使用。
> 可以查看 [main.ts](./src/main.ts) 和 任意的 dto 如：[create-user.dto.ts](./src/user/dto/create-user.dto.ts),执行对应路由，查看相应的错误信息，同时做**数据类型转换**，前端传入的 json 字符串变成相应的数组，number 等。
>
> 【优先级高】`app.useGlobalFilters(new HttpExceptionFilter());` 添加 http 错误过滤（格式化错误信息，和上面的`ValidationPipe()`冲突，二者只能选其一）
> @Catch() 装饰器 修饰 类 ExceptionFilter 自定义错误 filter，如：[http-exception.filter.ts](./src/core/filter/http-exception.filter.ts)

> 4、 提供错误捕获
> `throw new UnauthorizedException('token 不正确');`
>
> `throw new BadRequestException('用户名不正确！');`

### @nestjs/core

> 提供工厂函数创建 app，并提供大量配置的函数接口，[main.ts](./src/main.ts)
>
> `const app = await NestFactory.create(AppModule);`

### @nestjs/typeorm

> [app.module.ts](./src/app.module.ts)
>
> [auth.module.ts](./src/auth/auth.module.ts)
>
> [jwt.strategy.ts](./src/auth/strategies/jwt.strategy.ts)
>
> [posts.service.ts](./src/posts/posts.service.ts)

```ts
// 1、数据库连接
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局配置
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({ // 连接数据库
      imports: [ConfigModule], // 导入配置module
      inject: [ConfigService], // 注入配置service
      useFactory: // 数据库连接配置
    }),
	……
  ]
  ……
})

// 2、表连接
@Module({
  ……
  imports: [TypeOrmModule.forFeature([User])], // User 是 entity 类
  ……
})

// 3、注入到service 或者 strategy(策略)中,使用ts函数的方式操作数据库
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // User 是 entity 类
	private userRepository: Repository<User>,
  ) {}
  ……
}
```

## 常见错误

# 1、

> nodejs: listen EACCES: permission denied 0.0.0.0:80

```bash
sudo apt-get install libcap2-bin
# 允许 node 程序在1024以下的端口运行
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
```

## 词汇

```bash
strategy 策略
strategies 策略组
guard 守卫
authguard 验证守卫
secret 密钥
Bearer 持票人,携带密钥者（token的前缀）
exception filters 异常过滤器
gateways 网关

exposed  暴露
```
