import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import envConfig from './config/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
// import { PostsEntity } from './posts/posts.entity';
import { UserModule } from './user/user.module';
import { CollaborationModule } from './collaboration/collaboration.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局配置
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql', // 数据库类型
          // entities: [PostsEntity], // 数据表实体
          entities: ['dist/**/*.entity{.ts,.js}'], // 自动扫描
          host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost，第一个参数是字段，第二个参数是默认值（当字段内容不存在时）
          port: configService.get<number>('DB_PORT', 3306), // 端口号
          username: configService.get('DB_USER', 'root'), // 用户名
          password: configService.get('DB_PASSWORD', 'root'), // 密码
          database: configService.get('DB_DATABASE', 'blog'), //数据库名
          timezone: '+08:00', //服务器上配置的时区
          synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
        };
      },
    }),
    PostsModule,
    UserModule,
    CollaborationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
