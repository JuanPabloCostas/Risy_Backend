import { Test, TestingModule } from '@nestjs/testing';
import { ValidatefoodService } from './validatefood.service';

describe('ValidatefoodService', () => {
  let service: ValidatefoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidatefoodService],
    }).compile();

    service = module.get<ValidatefoodService>(ValidatefoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
