import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoModule } from 'src/core/databases/mongo.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [MongoModule, TypeOrmModule.forFeature([User]), AwsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
