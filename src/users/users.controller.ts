import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFilter } from 'src/common/helpers/fileFilter';

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
  @UseInterceptors(FileInterceptor('companyImage', {
    limits: {
      fileSize: 1024 * 1024 * 1 // 1 MB 
    },
    fileFilter: imageFilter,
  }))
  uploadImage(
    @Param('id', ParseMongoIdPipe) id: string
  ){
    return this.usersService.uploadImage(id);
  }
}
