import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

interface s3Configuration {
  directory: string;
  contentType: string;
  file: Buffer;
  fileName: string;
}

@Injectable()
export class S3Service {
  private readonly AWS_BUCKET_NAME: string;
  private readonly AWS_S3_ID: string;
  private readonly AWS_S3_SECRET_KEY: string;
  private readonly AWS_S3_REGION: string;
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.AWS_BUCKET_NAME = this.configService.get<string>('AWS_BUCKET_NAME');
    this.AWS_S3_ID = this.configService.get<string>('AWS_S3_ID');
    this.AWS_S3_SECRET_KEY = this.configService.get<string>('AWS_S3_SECRET_KEY');
    this.AWS_S3_REGION = this.configService.get<string>('AWS_S3_REGION');

    this.s3Client = new S3Client({
      region: this.AWS_S3_REGION,
      credentials: {
        accessKeyId: this.AWS_S3_ID,
        secretAccessKey: this.AWS_S3_SECRET_KEY,
      },
    });
  }

  private setUuid(fileName: string): string {
    const fileType = fileName.split('.').pop();
    return `${uuid()}.${fileType}`;
  }

  private async sendBucket(configuration: s3Configuration): Promise<void> {
    const { directory, contentType, file, fileName } = configuration;
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.AWS_BUCKET_NAME,
          Key: `${directory}/${fileName}`,
          Body: file,
          ContentType: contentType,
          ContentDisposition: 'inline',
          ACL: 'public-read',
        }),
      );
    } catch (error) {
      console.error('Error al subir a S3:', error);
      throw error;
    }
  }

  async uploadImage(fileName: string, file: Buffer, directory = ''): Promise<string> {
    const newFileName = this.setUuid(fileName);
    const config: s3Configuration = {
      directory: `images/${directory}`,
      contentType: 'image/jpg',
      file,
      fileName: newFileName,
    };
    await this.sendBucket(config);

    return `https://${this.AWS_BUCKET_NAME}.s3.${this.AWS_S3_REGION}.amazonaws.com/images/${directory}/${newFileName}`;
  }

  async uploadFile(fileName: string, file: Buffer, directory = ''): Promise<string> {
    const newFileName = this.setUuid(fileName);
    const dir = directory ? `files/${directory}` : 'files';

    const config: s3Configuration = {
      directory: dir,
      contentType: 'application/pdf',
      file,
      fileName: newFileName,
    };
    await this.sendBucket(config);

    return `https://${this.AWS_BUCKET_NAME}.s3.${this.AWS_S3_REGION}.amazonaws.com/${dir}/${newFileName}`;
  }
}
