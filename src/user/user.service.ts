import { User } from './entities/user.entity';
import {
  Injectable,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  async register(createUser: CreateUserDto) {
    const { username } = createUser;

    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(createUser); // 只是创建了一个新的用户对象
    await this.userRepository.save(newUser); // 保存才会进入数据库
    return await this.userRepository.findOne({ where: { username } });
  }

  async getUserInfo(username) {
    return await this.userRepository.findOne({ where: { username: username } });
  }
}
