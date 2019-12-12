import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl:String = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  fetchBooks():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/books`)
  }
}
