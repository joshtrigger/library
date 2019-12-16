import { TestBed } from "@angular/core/testing";

import { BooksService } from "./books.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

describe("BooksService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  function setUp() {
    const service: BooksService = TestBed.get(BooksService);
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    return { service, httpTestingController };
  }

  it("should be created", () => {
    const { service } = setUp();
    expect(service).toBeTruthy();
  });

  it("should call fetchBooks function", () => {
    const { service, httpTestingController } = setUp();
    const mockData = { title: "book title", authors: "joshua" };

    service.fetchBooks().subscribe(val => {
      expect(val).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(
      "http://localhost:8080/api/books"
    );
    req.flush(mockData);
    expect(req.request.method).toBe("GET");
  });

  it("should call reportBook function", () => {
    const { service, httpTestingController } = setUp();
    const mockData = { id: 1, book_id: 2, type: "damage" };

    service.reportBook(mockData).subscribe(val => {
      expect(val).toEqual({ message: "report sent" });
    });

    const req = httpTestingController.expectOne(
      "http://localhost:8080/api/reports"
    );
    req.flush({ message: "report sent" });
    expect(req.request.method).toBe("POST");
  });

  it("should call lendOutBook function", () => {
    const { service, httpTestingController } = setUp();
    const mockData = { id: 1, book_id: 1 };

    service.lendOutBook(mockData).subscribe(val => {
      expect(val).toEqual({ message: "thank you" });
    });

    const req = httpTestingController.expectOne(
      "http://localhost:8080/api/borrowed_books"
    );
    req.flush({ message: "thank you" });
    expect(req.request.method).toBe("POST");
  });

  afterEach(() => {
    const { httpTestingController } = setUp();
    httpTestingController.verify();
  });
});
