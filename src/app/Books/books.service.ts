import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  baseUrl: String = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  fetchBooks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/books`);
  }

  lendOutBook(bookId): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/lend/books`, {
      book_id: bookId
    });
  }

  reportBook(bookId): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reports`, {
      book_id: bookId
    });
  }
}
