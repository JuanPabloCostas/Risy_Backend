import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { MongoRepository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentsService {
  
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: MongoRepository<Comment>,
    @InjectRepository(User)
    private readonly userRespository: MongoRepository<User>,
    @InjectRepository(Post)
    private readonly postRepository: MongoRepository<Post>,

  ) {}

  public async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentDto);

    const post = await this.postRepository.findOne({ where: { id: createCommentDto.postId, status: true }});

    if (!post) {
      throw new NotFoundException('Invalid post id');
    }

    const user = await this.userRespository.findOne({ where: { id: createCommentDto.userId }});

    if (!user) {
      throw new NotFoundException('Invalid user id');
    }

    comment.post = post;
    comment.user = user;

    Object.assign(comment, await this.commentRepository.save(comment));

    return await this.findOne(comment.id)
  }

  public async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({where: { id }, relations: { user: true } });

    if (!comment) {
      throw new NotFoundException('Invalid comment id');
    }

    return comment;
  }
}
