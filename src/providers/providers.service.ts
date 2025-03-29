import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto, LoginDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { MongoRepository, ObjectId } from 'typeorm';
import { S3Service } from 'src/aws/s3.service';

@Injectable()
export class ProvidersService {

  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: MongoRepository<Provider>,
    private readonly s3Service: S3Service,
  ) { }


  public async signUp(createProviderDto: CreateProviderDto) {
    const provider = this.providerRepository.create(createProviderDto);

    // provider.photo_url = //Put the image url here

    Object.assign(provider, await this.providerRepository.save(provider));



    return await this.findOne(provider.id)
  }

  public async login(loginDto: LoginDto): Promise<Provider> {
    const provider = await this.providerRepository.findOne({ where: { email: loginDto.email } });

    if (!provider) {
      throw new NotFoundException('Invalid email or password');
    }

    if (provider.password !== loginDto.password) {
      throw new BadRequestException('Invalid email or password');
    }

    provider.password = undefined;

    return provider;

  }

  public async findOne(id: number): Promise<Provider> {

    const provider = await this.providerRepository.findOne({ 
      where: { id },
      relations: { posts: {comments: true} }
    });

    console.log("provider DSA:", provider);

    

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    provider.password = undefined;

    return provider;
  }

  public async listProviders(): Promise<Provider[]> {
    const providers = await this.providerRepository.find({});

    return providers.map((provider) => ({ ...provider, password: undefined }));
  }

  public async update(id: number, updateProviderDto: UpdateProviderDto): Promise<Provider> {
    const provider = await this.findOne(id);

    Object.assign(provider, updateProviderDto);

    await this.providerRepository.save(provider);

    return await this.findOne(id);
  }

  public async uploadImage(providerId: number, providerImage: Express.Multer.File): Promise<object> {
    console.log("id", providerId);
    try {
      const provider = await this.providerRepository.findOne({ where: { id: providerId } });
      if (!provider) {
        throw new NotFoundException('Provider not found');
      }
  
      const { originalname, buffer } = providerImage;
      const url = await this.s3Service.uploadImage(originalname, buffer, 'providers/profiles');
  
      provider.photoUrl = url;
      await this.providerRepository.save(provider);
  
      return {
        url,
        message: 'Image uploaded successfully',
      };
    } catch (error) {
      console.error(error);
  
      if (error instanceof NotFoundException) {
        throw error;
      }
  
      throw new BadRequestException('Error uploading image');
    }
  }
  
  
}
