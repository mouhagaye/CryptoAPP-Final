import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountsService } from './accounts.service';

@Injectable()
export class AccountsInterceptor implements HttpInterceptor {

  constructor(
    private accountService: AccountsService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.accountService.getToken();
    req = req.clone({
        setHeaders: {
            Authorization: "Bearer " + authToken
        }
    });
    return next.handle(req);
}
}
