import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  isString,
  IsString,
} from 'class-validator';

export enum Role {
  'root',
  'author',
  'visitor',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: '缺少用户名' })
  @ApiProperty({ description: '用户名', default: 'zoulam' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '缺少密码' })
  @ApiProperty({ description: '密码', default: '123' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '缺少昵称' })
  @ApiProperty({ description: '昵称' })
  nickname: string;

  @IsString()
  @ApiProperty({ description: '头像链接' })
  avatar: string;

  @IsEmail()
  @ApiProperty({ description: '邮箱', default: 'xx@xx.com' })
  email: string;

  // @IsNumber()
  // @ApiProperty({ description: '用户id' })
  // id: number;

  @IsEnum(Role)
  @ApiProperty({ description: '用户角色', default: 'author' })
  role: string; // 用户角色

  // @IsDate()
  // @IsNotEmpty({ message: '缺少创建时间' })
  // @ApiProperty({ description: '创建时间', default: new Date() })
  // createTime: Date;

  // @IsDate()
  // @IsNotEmpty({ message: '缺少更新时间' })
  // @ApiProperty({ description: '创建时间', default: new Date() })
  // updateTime: Date;
}
