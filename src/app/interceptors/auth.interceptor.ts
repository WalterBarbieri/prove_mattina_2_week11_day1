import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Intervento di auth interceptor!', request);
    const newRequest = request.clone({
      headers: request.headers.append('Auth', 'secretId').append('firma', 'xyz')
    })
    return next.handle(newRequest).pipe(tap(evento => {
      console.log('Nuova Richiesta', newRequest);
      console.log('Sono la risposta della chiamata da auth interceptor: ', evento);


    }));
  }
}
