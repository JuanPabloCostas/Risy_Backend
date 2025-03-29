import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongoModule } from 'src/core/databases/mongo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';

@Module({
  imports: [MongoModule, TypeOrmModule.forFeature([Comment, User, Post]) ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
