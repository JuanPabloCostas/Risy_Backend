import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongoModule } from 'src/core/databases/mongo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ProvidersModule } from 'src/providers/providers.module';
import { ProvidersService } from 'src/providers/providers.service';
import { Provider } from 'src/providers/entities/provider.entity';
import { AwsModule } from 'src/aws/aws.module';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [MongoModule, TypeOrmModule.forFeature([Post]), TypeOrmModule.forFeature([Provider]), AwsModule, HttpModule, CommonModule],
  controllers: [PostsController],
  providers: [PostsService, ProvidersService],
})
export class PostsModule {}
