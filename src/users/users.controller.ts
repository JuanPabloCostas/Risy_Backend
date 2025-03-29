import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LikePostDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFilter } from 'src/common/helpers/fileFilter';
import { ObjectId } from 'mongodb';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Post('/login') 
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Get()
  listAllUsers() {
    return this.usersService.listAllUsers();
  }

  @Patch(':userId/image')
  @UseInterceptors(FileInterceptor('userImage', {
    limits: {
      fileSize: 1024 * 1024 * 1 // 1 MB 
    },
    fileFilter: imageFilter,
  }))
  uploadImage(
    @Param('userId', ParseIntPipe) userId: number,
    @UploadedFile() userImage: Express.Multer.File,
  ){
    return this.usersService.uploadImage(userId, userImage);
  }

  @Get('/:userId')
  getUserById(@Param('userId') userId: number) {
    return this.usersService.getLikedPosts(userId);
  }

  @Post('/like')
  likePost(@Body() likePostDto: LikePostDto) {
    return this.usersService.likePost(likePostDto);
  }
}
