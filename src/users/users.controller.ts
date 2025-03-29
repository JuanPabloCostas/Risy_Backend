import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';

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
  uploadImage(
    @Param('id', ParseMongoIdPipe) id: string
  ){
    return this.usersService.uploadImage(id);
  }
}
