import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Reader } from "../interfaces";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ReadersService {
  baseUrl: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  getReaders(): Observable<Reader[]> {
    return this.http
      .get<Reader[]>(`${this.baseUrl}/readers`)
      .pipe(catchError(this.errorHandler));
  }

  addReader(data): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/readers`, data)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.status === 404) {
      errorMessage = err.statusText;
    } else if (err.status === 500) {
      errorMessage = err.statusText;
    }
    return throwError(errorMessage);
  }
}
