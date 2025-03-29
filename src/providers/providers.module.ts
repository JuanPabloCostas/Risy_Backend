import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { MongoModule } from 'src/core/databases/mongo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';

@Module({
  imports: [MongoModule, TypeOrmModule.forFeature([Provider])],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
