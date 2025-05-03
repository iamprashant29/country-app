import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {inject} from '@angular/core';
import {ErrorService} from '../service/error.service';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const errorService = inject(ErrorService);
  if (req.url.includes('/name')) {
    return next(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          errorService.setCountryNotFoundApiError();
        }
        throw err;
      })
    );
  }
  return next(req);
}
