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

    const provider = await this.providersService.findOne(new MongoOjbect(createPostDto.providerId));

    post.provider = provider;
    post.status = true;

    Object.assign(post, await this.postRepository.save(post));

    return await this.findOne(post._id)
  }

  public async findOne(_id: ObjectId): Promise<Post> {

    console.log("post id:", _id);
    

    const post = await this.postRepository.findOne({where: { _id, status: true }, relations: { provider: true }});

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

  public async update(_id: ObjectId, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(_id);

    Object.assign(post, updatePostDto);

    await this.postRepository.save(post);

    return this.findOne(_id)
  };

  public async delete(_id: ObjectId): Promise<Post> {
    const post = await this.findOne(_id);

    post.status = false;

    await this.postRepository.save(post);

    return post;
  }

}
