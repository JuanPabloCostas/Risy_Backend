import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ObjectId } from 'mongodb';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  async listAllPosts() {
    return this.postsService.listAllPosts();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(new ObjectId(id));
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(new ObjectId(id), updatePostDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.postsService.delete(new ObjectId(id));
  }
}
