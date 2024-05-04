import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const methodName = context.getHandler().name;
        const statusCode = this.getStatusCode(methodName);
        const statusText = this.statusTextMap[statusCode] || 'Unknown';

        return next.handle().pipe(
            map(data => ({
                code: statusCode,
                status: statusText,
                message: 'Success',
                payload: data,
                errors: null,
            })),
        );
    }

    private statusTextMap = {
        [HttpStatus.OK]: 'OK',
        [HttpStatus.CREATED]: 'Created',
    };

    private getStatusCode(methodName: string): number {
        switch (methodName) {
            case 'saveUser':
                return HttpStatus.CREATED;
            case 'getUsers':
                return HttpStatus.OK;
            default:
                return HttpStatus.OK;
        }
    }
}