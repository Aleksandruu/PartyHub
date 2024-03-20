import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LOCALSTORAGEKEYS } from '../constants/localStorage';
import { Token } from '../types/token.type';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let tokenAsString: string | null = localStorage.getItem(
      LOCALSTORAGEKEYS.TOKEN
    );

    if (tokenAsString) {
      let token: Token = JSON.parse(tokenAsString);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
