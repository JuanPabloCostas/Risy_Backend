import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { MongoModule } from 'src/core/databases/mongo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [MongoModule, TypeOrmModule.forFeature([Provider]), AwsModule],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
