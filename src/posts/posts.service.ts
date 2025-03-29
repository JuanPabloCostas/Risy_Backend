import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectId } from 'typeorm';
import { Post } from './entities/post.entity';
import { ObjectId as MongoOjbect } from 'mongodb';
import { ProvidersService } from 'src/providers/providers.service';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: MongoRepository<Post>,
    private readonly providersService: ProvidersService,
  ) {}

  public async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);

    const provider = await this.providersService.findOne(createPostDto.providerId);

    post.provider = provider;
    post.status = true;

    Object.assign(post, await this.postRepository.save(post));

    return await this.findOne(post.id)
  }

  public async findOne(id: number): Promise<Post> {


    console.log("post id:", id);
    

    const post = await this.postRepository.findOne({where: { id, status: true }, relations: { provider: true, comments: { user: true} } });

    console.log("post:", post);
    

    if (!post) {
      throw new NotFoundException('Invalid post id');
    }

    return post;
  }

  public async listAllPosts() {
    // return this.postRepository.find({where: { status: true }, relations: { provider: true }});
    return await this.postRepository.find({where: { status: true }});

  }

  public async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);

    Object.assign(post, updatePostDto);

    await this.postRepository.save(post);

    return this.findOne(id)
  };

  public async delete(id:number): Promise<Post> {
    const post = await this.findOne(id);

    post.status = false;

    await this.postRepository.save(post);

    return post;
  }

}
