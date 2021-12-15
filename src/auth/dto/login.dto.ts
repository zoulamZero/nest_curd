import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/user/dto/create-user.dto';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: '账号', default: 'zoulam' })
  @IsNotEmpty({ message: '缺少用户名' })
  readonly username: string;

  @IsString()
  @ApiProperty({ description: '密码', default: '123' })
  @IsNotEmpty({ message: '缺少密码' })
  readonly password: string;

  @IsEnum(Role)
  @ApiProperty({ description: '用户权限', default: 'author' })
  @IsNotEmpty({ message: '缺少权限' })
  readonly role: string;
}
