import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ProvidersModule } from './providers/providers.module';
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
    ProvidersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
