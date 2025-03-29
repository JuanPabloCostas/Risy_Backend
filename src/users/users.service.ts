import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) 
    private readonly userRepository: MongoRepository<User>,
  ) {}

  public async listAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async signUp(createUserDto: CreateUserDto): Promise<User> {

    const user = this.userRepository.create(createUserDto);

    // user.photo_url = //Put the image url here

    return await this.userRepository.save(user);
  }

  public async login(loginDto: LoginDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    if (user.password !== loginDto.password) {
      throw new BadRequestException('Invalid email or password');
    }
    
    user.password = undefined;

    return user;
  }


}
