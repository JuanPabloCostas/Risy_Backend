import { Module } from '@nestjs/common';
import { ValidatefoodService } from './providers/validatefood/validatefood.service';

@Module({
  providers: [ValidatefoodService],
  exports: [ValidatefoodService],
})
export class CommonModule {}
