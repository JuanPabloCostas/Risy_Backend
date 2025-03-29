import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ResponseDto } from "src/core/responses/response.dto";

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response: ResponseDto = {
          success: true,
          extra: "Te queremos musho diegito",
          error_code: null,
          message: 'Operation successful',
          data: data,
        };
        return response;
      }),
    );
  }
}