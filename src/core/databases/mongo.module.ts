import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { Provider } from 'src/providers/entities/provider.entity';
import { Todo } from 'src/todo/entities/todo.entity';
import { User } from 'src/users/entities/user.entity';
import { getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        
        console.log("database:", configService.get('database'));
        
//  other comment
        return {
          type: 'mysql',
          host: configService.get('host'),
          port: +configService.get('port'),
          username:configService.get('username'),
          password: configService.get('password'),
          database: configService.get('database'),
          entities: [Todo, User, Post, Provider],
          synchronize: true,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class MongoModule {}