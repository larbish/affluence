import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpExampleService {
	constructor(private http: HttpClient) {}

	getFromApi(body: object): Observable<string> {
		return this.http.get('/my-api', body).pipe(
			map((res: string) => {
				return res;
			}),
		);
	}
}
