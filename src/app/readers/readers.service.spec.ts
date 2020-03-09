import { TestBed, fakeAsync, flush, tick } from "@angular/core/testing";

import { ReadersService } from "./readers.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from "@angular/common/http/testing";
import { Reader } from "../interfaces";

describe("ReadersService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  function setUp() {
    const service: ReadersService = TestBed.get(ReadersService);
    const httpTestingController: HttpTestingController = TestBed.get(
      HttpTestingController
    );
    return { service, httpTestingController };
  }

  it("should be created", () => {
    const { service } = setUp();
    expect(service).toBeTruthy();
  });

  it("should get all readers from the backend server", () => {
    const { service, httpTestingController } = setUp();
    const mockResponse = {
      id: 1,
      name: "joshu",
      email: "m@M.c",
      id_no: 123,
      id_type: "work",
      phone_number: "12343",
      borrowed_books: 2
    };
    service.getReaders().subscribe(val => {
      expect(val).toEqual([mockResponse]);
    });

    const req: TestRequest = httpTestingController.expectOne(
      "http://localhost:8080/api/readers"
    );
    req.flush([mockResponse]);
    expect(req.request.method).toBe("GET");
  });

  it("should error while fetching data with a 404 not found", fakeAsync(() => {
    const { service, httpTestingController } = setUp();
    service.getReaders().subscribe(
      () => {},
      err => expect(err).toEqual("not found")
    );

    const req: TestRequest = httpTestingController.expectOne(
      "http://localhost:8080/api/readers"
    );
    req.flush(null, {
      status: 404,
      statusText: "not found"
    });
    flush();
    expect(req.request.method).toBe("GET");
  }));

  it("should error while fetching readers with a 500 internal server error", fakeAsync(() => {
    const { service, httpTestingController } = setUp();
    service.getReaders().subscribe(
      () => {},
      err => expect(err).toEqual("internal server error")
    );

    const req: TestRequest = httpTestingController.expectOne(
      "http://localhost:8080/api/readers"
    );
    req.error(new ErrorEvent("error occurred"), {
      status: 500,
      statusText: "internal server error"
    });
    flush();
    expect(req.request.method).toBe("GET");
  }));

  it("should error while fetching readers with other error", fakeAsync(() => {
    const { service, httpTestingController } = setUp();
    service.getReaders().subscribe(
      () => {},
      err => expect(err).toEqual("bad request error")
    );

    const req: TestRequest = httpTestingController.expectOne(
      "http://localhost:8080/api/readers"
    );
    req.error(new ErrorEvent("error occurred"), {
      status: 400,
      statusText: "bad request error"
    });
    flush();
    expect(req.request.method).toBe("GET");
  }));

  it("should add reader to the backend server", () => {
    const { service, httpTestingController } = setUp();
    const mockResponse = {
      id: 1,
      name: "joshu",
      email: "m@M.c",
      id_no: 123,
      id_type: "work",
      phone_number: "12343",
      borrowed_books: 2
    };
    service.addReader({}).subscribe(val => {
      expect(val).toEqual(mockResponse);
    });

    const req: TestRequest = httpTestingController.expectOne(
      "http://localhost:8080/api/readers"
    );
    req.flush(mockResponse);
    expect(req.request.method).toBe("POST");
  });

  afterEach(() => {
    const { httpTestingController } = setUp();
    httpTestingController.verify();
  });
});
