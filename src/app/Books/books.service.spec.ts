import { TestBed } from "@angular/core/testing";

import { BooksService } from "./books.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("BooksService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it("should be created", () => {
    const service: BooksService = TestBed.get(BooksService);
    expect(service).toBeTruthy();
  });
});
