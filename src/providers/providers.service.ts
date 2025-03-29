import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { MongoRepository, ObjectId } from 'typeorm';

@Injectable()
export class ProvidersService {

  constructor(
    @InjectRepository(Provider) 
    private readonly providerRepository: MongoRepository<Provider>,
  ) {}
  

  public async signUp(createProviderDto: CreateProviderDto): Promise<Provider> {
    const provider = this.providerRepository.create(createProviderDto);

    // provider.photo_url = //Put the image url here

    Object.assign(provider, await this.providerRepository.save(provider));

    console.log("provider id:", provider._id);
    

    return {
      ...(await this.findOne(provider._id)),
      password: undefined
    }
  }

  public async findOne(_id: ObjectId): Promise<Provider> {

    console.log("id:", _id);
    
    const provider = await this.providerRepository.findOne({where: { _id }});

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    return provider;
  }

  public async listProviders(): Promise<Provider[]> {
    return await this.providerRepository.find();
  }
}
