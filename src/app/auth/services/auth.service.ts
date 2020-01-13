import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Librarian } from "src/app/interfaces";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl: String = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  /**
   * This method checks if the user is logged in and token
   * is stored in the local storage
   *
   * @returns true if user is logged in otherwise false
   */
  getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      return true;
    }
    return false;
  }

  /**
   * This method sends user credentials to backend server via login
   * route and waits for a response that it in turn send to the bound
   * component
   *
   * @param payload object containing user info like username/email
   * and password
   *
   * @returns Obervable containing the response from the backend server
   */
  loginUser(payload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, payload);
  }

  /**
   * This method fetch all the librarians stored in the in-memory
   * data collection.
   *
   * @returns Observable with http response from in-memory web api module
   */
  fetchLibrarians(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/librarians`);
  }

  /**
   * This method processes request for user to reset password
   *
   * @param payload object containing user email
   *
   * @returns Observable with http response from in-memory web api module
   */
  forgotPassword(payload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/forgot-password`, payload);
  }

  /**
   * This method resets user's password
   *
   * @param payload object containig user's new password
   *
   * @returns Observable with http response from in-memory web api module
   */
  resetPassword(payload): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/reset-password`, payload);
  }

  /**
   * This method is responsible for creating the user account
   * 
   * @param payload user credentials
   */
  signUpUser(payload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sign-up`, payload);
  }
}
