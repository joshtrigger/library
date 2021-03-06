import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Book } from "../interfaces";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  baseUrl: String = "http://localhost:8080/api";
  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  httpOptions = {
    headers: this.headers
  };
  private filterText: Subject<string> = new Subject<string>();
  get searchText$(): Observable<string> {
    return this.filterText.asObservable();
  }

  constructor(private http: HttpClient) {}

  setSearchText(value: string): void {
    this.filterText.next(value);
  }

  /**
   * This method fetches all the books from the database
   */
  fetchBooks(param: string = ""): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/books?title=${param}`);
  }

  /**
   * this methods lends out books to the users
   *
   * @param data is the id of the book being lent out
   */
  lendOutBook(data: object): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/borrowed_books`, data);
  }

  /**
   * this method is responsible for reporting a book
   *
   * @param data id of the book being reported
   */
  reportBook(data: object): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reports`, data);
  }

  /**
   * this method delete the specified boo from the database
   *
   * @param bookId id of the book being deleted from the database
   */
  deleteBook(bookId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/books/${bookId}`);
  }

  /**
   * this method adds the new book to the database
   *
   * @param data deteils of the new book being added to the database
   */
  addBook(data: object): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/books`, data);
  }

  /**
   * this method is responsible for updating the book info
   *
   * @param id id of the book being edited
   * @param data the new book data
   */
  editBook(id: Number, data: Book): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/books/${id}`,
      data,
      this.httpOptions
    );
  }
}
