import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { ObjectId } from 'typeorm';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post('/signup')
  async create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.signUp(createProviderDto);
  }

  @Get()
  listAllProviders() {
    return this.providersService.listProviders();
  }

  @Get('/:id')
  findOne(@Param('id') id: ObjectId) {
    return this.providersService.findOne(id);
  }
}
