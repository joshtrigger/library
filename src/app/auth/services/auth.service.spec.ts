import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { Librarian } from "src/app/interfaces";

describe("AuthService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  function setUp() {
    const service: AuthService = TestBed.get(AuthService);
    const httpTestingController = TestBed.get(HttpTestingController);
    return { service, httpTestingController };
  }

  it("should be created", () => {
    const { service } = setUp();
    expect(service).toBeTruthy();
  });

  it("should login user", () => {
    const { service, httpTestingController } = setUp();
    const payload = { email: "me@me.com", password: "pass" };
    service.loginUser(payload).subscribe(data => {
      expect(data).toEqual(null);
    });

    const req = httpTestingController.expectOne(
      "http://localhost:8080/api/login"
    );
    expect(req.request.method).toBe("POST");
  });

  it("should fetch all librarians", () => {
    const { service, httpTestingController } = setUp();
    const mockData: Librarian = {
      id: 1,
      name: "john doe",
      email: "me@me.com",
      password: "pass"
    };
    service.fetchLibrarians().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(
      "http://localhost:8080/api/librarians"
    );
    expect(req.request.method).toBe("GET");
  });

  it("should return true when user is logged in", () => {
    const { service } = setUp();
    const mockUser = { name: "johndoe", email: "jon.doe@email.com" };
    const localStorageSpy = jasmine.createSpyObj("localStorage", [
      "setItem",
      "getItem"
    ]);

    localStorageSpy.getItem.and.returnValue(mockUser);

    expect(service.getCurrentUser()).toBeTruthy();
  });

  it("should return false when no user is logged in", () => {
    const { service } = setUp();

    spyOn(localStorage, "getItem").and.callFake((key: string) => {
      return null;
    });

    expect(service.getCurrentUser()).toBeFalsy();
  });

  it("should call forgot password", () => {
    const { service, httpTestingController } = setUp();
    const mockData = { email: "me@me.com" };

    service.forgotPassword(mockData).subscribe(data => {
      expect(data).toEqual("");
    });

    const request = httpTestingController.expectOne(
      "http://localhost:8080/api/forgot-password"
    );
    expect(request.request.method).toEqual("POST");
  });

  it("should call reset password", () => {
    const { service, httpTestingController } = setUp();
    const mockData = { newPassword: "pass", confirmPassword: "pass" };

    service.resetPassword(mockData).subscribe(data => {
      expect(data).toEqual("");
    });

    const request = httpTestingController.expectOne(
      "http://localhost:8080/api/reset-password"
    );
    expect(request.request.method).toEqual("PUT");
  });

  afterEach(() => {
    const { httpTestingController } = setUp();
    httpTestingController.verify();
  });
});
