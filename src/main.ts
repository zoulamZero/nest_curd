import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  // 注册全局错误的过滤器(会干扰后面的pipe)
  // app.useGlobalFilters(new HttpExceptionFilter());
  // 设置全局的Interceptors，保证后台返回的数据格式一致
  app.useGlobalInterceptors(new TransformInterceptor());
  // 设置全局管道做数据验证和转换
  app.useGlobalPipes(new ValidationPipe());

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth() // 添加验证方式（token）
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  let port = 4000;
  await app.listen(port, () => {
    console.log(
      `open in http://localhost:${port}/api , docs run in http://localhost:${port}/docs`,
    );
  });
}
bootstrap();
