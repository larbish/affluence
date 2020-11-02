import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ServerHostPreInterceptor implements HttpInterceptor {
	private conf: object;

	constructor() {
		this.conf = environment || {};
	}

	intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
		const serverHost = "http://localhost:3000";

		return next.handle(req.clone({ url: serverHost + req.url }));
	}
}
