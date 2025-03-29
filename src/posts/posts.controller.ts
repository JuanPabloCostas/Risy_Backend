import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, ParseIntPipe, UploadedFile, BadRequestException, UploadedFiles } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ObjectId } from 'mongodb';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageFilter } from 'src/common/helpers/fileFilter';

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
  async findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.postsService.delete(id);
  }

  
  @Patch(':postId/image')
  @UseInterceptors(FilesInterceptor('postImages', 15, {
    limits: { fileSize: 1024 * 1024 * 2 },
  }))
  
async uploadImages(
  @Param('postId', ParseIntPipe) postId: number,
  @UploadedFiles() files: Express.Multer.File[],
) {
  if (!files || files.length === 0) {
    throw new BadRequestException('No image files provided');
  }
  return this.postsService.uploadImages(postId, files);
}

}
