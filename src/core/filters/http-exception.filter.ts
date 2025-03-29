import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, NotFoundException, ForbiddenException, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from '../responses/response.dto';
import { BadRequestValidationPipeException } from '../exceptions/badRequestPipe-exceptions';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        

        let httpException: HttpException;
        
        console.log("Exeption: ", exception)
        console.log("Exeption code: ", exception.code);
        console.log("Exeption details: ", exception.details);
        console.log("Exeption message: ", exception.message);
        

        if (exception instanceof BadRequestValidationPipeException) {
            httpException = new BadRequestException(exception.messages) 
        } else if (exception instanceof HttpException) {
            httpException = exception;
        } else {
            httpException = new BadRequestException(exception.message);
        }

        const errorResponse: ResponseDto = {
            success: false,
            extra: "Wakey wakey",
            error_code: httpException.getStatus(),
            message: httpException.message,
            path: request.url,
            data: null,
        };

        response.status(+errorResponse.error_code).json(errorResponse);
    }
}