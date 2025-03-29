
export class ResponseDto {

  success: boolean;

  error_code?: number | string;

  message: string;

  extra: string;

  data: any;

  path?: string;

}