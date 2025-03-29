import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { MongoRepository, ObjectId } from 'typeorm';

@Injectable()
export class ProvidersService {

  constructor(
    @InjectRepository(Provider) 
    private readonly providerRepository: MongoRepository<Provider>,
  ) {}
  

  public async signUp(createProviderDto: CreateProviderDto) {
    const provider = this.providerRepository.create(createProviderDto);

    // provider.photo_url = //Put the image url here

    Object.assign(provider, await this.providerRepository.save(provider));

    

    // return {
    //   ...(await this.findOne()),
    //   password: undefined
    // }
  }

  public async findOne(id: ObjectId): Promise<Provider> {

    console.log("id:", id);
    
    const provider = await this.providerRepository.findOne({where: { id }});

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    return provider;
  }

  public async listProviders(): Promise<Provider[]> {
    return await this.providerRepository.find();
  }
}
