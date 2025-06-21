import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorProjetoInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // console.info("Interceptor sendo chamado");

    var authorization = '' + localStorage.getItem('Authorization');

    // Faz o envio do token na requisição 
    if (authorization !== '' && authorization !== null && authorization !== 'null') {
      // console.info('token JWT recuperado: ' + authorization);
      const autRequ = request.clone({
        headers: request.headers.set('authorization', authorization)
      });

      return next.handle(autRequ);
    }else{
      return next.handle(request);
    }

  }
}
