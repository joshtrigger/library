import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  baseUrl: String = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  /**
   * This method fetches all the books from the database
   */
  fetchBooks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/books`);
  }

  /**
   * this methods lends out books to the users
   * 
   * @param data is the id of the book being lent out
   */
  lendOutBook(data): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/borrowed_books`, data);
  }

  /**
   * this method is responsible for reporting a book
   * 
   * @param data id of the book being reported
   */
  reportBook(data): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reports`, data);
  }

  /**
   * this method delete the specified boo from the database
   * 
   * @param bookId id of the book being deleted from the database
   */
  deleteBook(bookId): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/books/${bookId}`);
  }

  /**
   * this method adds the new book to the database
   * 
   * @param data deteils of the new book being added to the database
   */
  addBook(data): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/books`, data);
  }
}
