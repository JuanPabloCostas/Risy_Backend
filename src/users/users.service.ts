import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, LikePostDto, LoginDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MongoRepository } from 'typeorm';
import { S3Service } from 'src/aws/s3.service';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) 
    private readonly userRepository: MongoRepository<User>,
    private readonly s3Service: S3Service,
    @InjectRepository(Post)
    private readonly postRepository: MongoRepository<Post>,
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

  public async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Invalid user id');
    }

    return user;
  }

  public async uploadImage(id: number, userImage: Express.Multer.File): Promise<object> {
    console.log("id", id);  
    try{
      const { originalname, buffer } = userImage;
      const url = await this.s3Service.uploadImage(originalname, buffer, 'users/profiles');

      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      console.log('user', user);
      user.photo_url = url;
      await this.userRepository.save(user);

      return {
        url,
        message: 'Image uploaded successfully',
      }
    } catch (error) { 
      throw new BadRequestException('Error uploading image');
    }
  }

  public async getLikedPosts(userId: number): Promise<Post[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: {posts: { comments: true, provider: true } } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.posts

  }

  public async likePost(likePostDto: LikePostDto) {
    const { postId, userId } = likePostDto;

    const user = await this.userRepository.findOne({ where: { id: userId }, relations: {posts: { comments: true, provider: true } } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = await this.postRepository.findOne({ where: { id: postId, status: true } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const posts = user.posts.filter((post) => post.status === true).concat(post);

    user.posts = posts;
    
    await this.userRepository.save(user);

    return


  }


}
