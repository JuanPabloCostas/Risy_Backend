import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entities/todo.entity';
import { getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        

        console.log("database:", configService.get('database'));
        

        return {
          type: 'mongodb',
          url: configService.get('mongodb_uri'),
          database: configService.get('database'),
          entities: [Todo],
          logging: true,
          autoLoadEntities: true,
          synchronize: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class MongoModule {}