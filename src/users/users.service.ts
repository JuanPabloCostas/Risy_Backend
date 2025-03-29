import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MongoRepository } from 'typeorm';
import { S3Service } from 'src/aws/s3.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) 
    private readonly userRepository: MongoRepository<User>,
    private readonly s3Service: S3Service,
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

  public async uploadImage(id: string, userImage: Express.Multer.File): Promise<object> {
    try{
      const { originalname, buffer } = userImage;
      const data = await this.s3Service.uploadImage(originalname, buffer, 'users/profiles');

      return {data}
    } catch (error) { 
      throw new BadRequestException('Error uploading image');
    }
  }


}
