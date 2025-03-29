import { BadRequestException } from '@nestjs/common';

export class BadRequestValidationPipeException extends BadRequestException {

  messages: string;
  
  constructor(errors: string[]) {
    super({
      statusCode: 400,
      error: 'Validation Failed',
      messages: errors,
    });
    this.messages = errors.join(' | ');
  }
}