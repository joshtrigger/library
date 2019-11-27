import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Librarian } from "src/app/interfaces";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl: String = "http://localhost:8080/api";
  constructor(private http: HttpClient) {}

  getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      return true;
    }
    return false;
  }
  loginUser(payload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, payload);
  }
  fetchLibrarians(): Observable<Librarian> {
    return this.http.get<Librarian>(`${this.baseUrl}/librarians`);
  }
}
