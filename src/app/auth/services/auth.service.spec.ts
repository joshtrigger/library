import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { Router } from "@angular/router";

describe("AuthService", () => {
  let routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Router, useValue: routerSpy }]
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
      expect(data).toEqual({ message: "success" });
    });

    const req = httpTestingController.expectOne(
      "http://localhost:8080/api/login"
    );
    req.flush({ message: "success" });
    expect(req.request.method).toBe("POST");
  });

  it("should fetch all librarians", () => {
    const { service, httpTestingController } = setUp();
    service.fetchLibrarians().subscribe(data => {
      expect(data).toEqual([{id:1,name:'joshua',email:'me@me.com',password:'pass2'}]);
    });

    const req = httpTestingController.expectOne(
      "http://localhost:8080/api/librarians"
    );
    req.flush([{id:1,name:'joshua',email:'me@me.com',password:'pass2'}]);
    expect(req.request.method).toBe("GET");
  });

  it("should return true when user is logged in", () => {
    const { service } = setUp();
    const mockUser = { name: "johndoe", email: "jon.doe@email.com" };
    const localStorageSpy = jasmine.createSpyObj("localStorage", [
      "setItem",
      "getItem"
    ]);

    localStorageSpy.setItem.and.returnValue(mockUser);

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
      expect(data).toEqual({ message: "email has been sent" });
    });

    const request = httpTestingController.expectOne(
      "http://localhost:8080/api/forgot-password"
    );
    request.flush({ message: "email has been sent" });
    expect(request.request.method).toEqual("POST");
  });

  it("should call reset password", () => {
    const { service, httpTestingController } = setUp();
    const mockData = { newPassword: "pass", confirmPassword: "pass" };

    service.resetPassword(mockData).subscribe(data => {
      expect(data).toEqual({ message: "password has been reset" });
    });

    const request = httpTestingController.expectOne(
      "http://localhost:8080/api/reset-password"
    );
    request.flush({ message: "password has been reset" });
    expect(request.request.method).toEqual("PUT");
  });

  it("should call sign up method", () => {
    const { service, httpTestingController } = setUp();
    const mockData = {
      username: "pass",
      email: "me@me.com",
      password: "pass123"
    };

    service.signUpUser(mockData).subscribe(data => {
      expect(data).toEqual({ message: "account has been created"});
    });

    const request = httpTestingController.expectOne(
      "http://localhost:8080/api/sign-up"
    );
    request.flush({ message: "account has been created"});
    expect(request.request.method).toEqual("POST");
  });

  it("should log out the user", () => {
    const { service } = setUp();
    spyOn(localStorage, "removeItem");

    service.logOut();

    expect(routerSpy.navigate).toHaveBeenCalledWith(["/auth/login"]);
    expect(localStorage.removeItem).toHaveBeenCalledWith("currentUser");
  });

  it("should test for get isLoggedIn obervable", () => {
    const { service } = setUp();
    const observable = service.isLoggedIn;

    expect(observable).toBeDefined();
  });

  afterEach(() => {
    const { httpTestingController } = setUp();
    httpTestingController.verify();
  });
});
