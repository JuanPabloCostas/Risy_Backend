import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectId } from 'typeorm';
import { Post } from './entities/post.entity';
import { ObjectId as MongoOjbect } from 'mongodb';
import { ProvidersService } from 'src/providers/providers.service';
import { S3Service } from '../aws/s3.service';
import { HttpService } from '@nestjs/axios';
import { ValidatefoodService } from '../common/providers/validatefood/validatefood.service';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: MongoRepository<Post>,
    private readonly providersService: ProvidersService,
    private readonly s3Service: S3Service,
    private readonly httpService: HttpService,
    private readonly validatefoodService: ValidatefoodService,
  ) { }

  public async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);

    const provider = await this.providersService.findOne(new MongoOjbect(createPostDto.providerId));

    post.provider = provider;
    post.status = true;

    Object.assign(post, await this.postRepository.save(post));

    return await this.findOne(post.id)
  }

  public async findOne(id: number): Promise<Post> {


    console.log("post id:", id);


    const post = await this.postRepository.findOne({ where: { id, status: true }, relations: { provider: true } });

    console.log("post:", post);


    if (!post) {
      throw new NotFoundException('Invalid post id');
    }

    return post;
  }

  public async listAllPosts() {
    // return this.postRepository.find({where: { status: true }, relations: { provider: true }});
    return await this.postRepository.find({ where: { status: true } });

  }

  public async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);

    Object.assign(post, updatePostDto);

    await this.postRepository.save(post);

    return this.findOne(id)
  };

  public async delete(id: number): Promise<Post> {
    const post = await this.findOne(id);

    post.status = false;

    await this.postRepository.save(post);

    return post;
  }

  async uploadImages(postId: number, files: Express.Multer.File[]) {
    try {
      const post = await this.postRepository.findOne({ where: { id: postId } });
      if (!post) {
        throw new NotFoundException('Post not found');
      }

      const urls: string[] = [];
      for (const file of files) {
        const { originalname, buffer } = file;
        const url = await this.s3Service.uploadImage(originalname, buffer, 'posts/profiles');
        urls.push(url);
      }
      console.log("urls", urls);
      post.photoUrls = [...(post.photoUrls || []), ...urls];
      await this.postRepository.save(post);

      return {
        photoUrls: post.photoUrls,
        message: 'Images uploaded successfully',
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error uploading images');
    }
  }

  async validateFood(postId: number){
    try {
      // Buscar el post en la base de datos
      const post = await this.postRepository.findOne({ 
        where: { id: postId },
      });
      
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      
      // Validar la imagen usando el servicio de validación
      const validationResults = await this.validatefoodService.validateImage(post.photoUrls[0]);
      console.log("validationResults", validationResults);
      if (validationResults.status === 200) {
        post.status = false;
        await this.postRepository.save(post);
        return {
          message: 'Post was blocked',
          validationResults: validationResults.data,
        };
      }
    } catch (error) {
      console.error('Validation error:', error);
      if (error.response?.data) {
        console.error('API error response:', error.response.data);
      }
      throw new BadRequestException('Error validating food: ' + error.message);
    }}
}
