import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ProvidersModule } from './providers/providers.module';
import { AwsModule } from './aws/aws.module';
import { S3Service } from './s3.service';
import config from './core/config/config';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [config],
    }),
    TodoModule,
    UsersModule,
    PostsModule,
    ProvidersModule,
    AwsModule
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
