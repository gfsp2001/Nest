import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeOutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(timeout(5000),
            catchError(err => {
                const customError = new Error('Timeout has occurred');
                customError.name = 'TimeoutError';
                throw customError;
            }),
        );
    }
}