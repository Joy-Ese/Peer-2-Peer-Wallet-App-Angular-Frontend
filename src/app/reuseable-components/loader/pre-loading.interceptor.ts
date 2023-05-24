import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PreLoaderService } from 'src/app/services/pre-loader.service';

@Injectable()
export class PreLoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(public preLoadingService: PreLoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.preLoadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.preLoadingService.setLoading(false);
        }
      })
    );
  }
}
