import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl: String = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}
  loginUser(url,payload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${url}`, payload);
  }
  fetchLibrarians():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/librarians`)
  }
}
