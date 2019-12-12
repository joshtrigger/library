// import { TestBed } from "@angular/core/testing";

// import { DataService } from "./data.service";
// import { HttpClientTestingModule } from "@angular/common/http/testing";
// import { of } from "rxjs";

// describe("DataService", () => {
//   beforeEach(() =>
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule]
//     })
//   );

//   it("should be created", () => {
//     const service: DataService = TestBed.get(DataService);
//     expect(service).toBeTruthy();
//   });

//   it("should create the database", () => {
//     const service: DataService = TestBed.get(DataService);
//     service.createDb();
//     expect(service.createDb).toBeDefined();
//   });

//   it("should 'return authentication function call when collectionName='login'", () => {
//     const service = TestBed.get(DataService);
//     const req = {
//       apiBase: "api/",
//       req: {
//         url: "",
//         body: { email: "me@me.com", password: "pass123" }
//       },
//       collectionName: "login",
//       collection: {},
//       headers: {
//         lazyInit: jasmine.createSpy()
//       },
//       methos: "post",
//       id: undefined,
//       query: {},
//       resourceUrl: "api/login/",
//       url: "http://localhost:8080/api/login",
//       utils: {
//         createResponse$: jasmine.createSpy()
//       }
//     };
//     service.post(req)

//     expect(service.authenticate).toBeDefined();
//   });

//   it("should return undefined if collectionName is not 'login'", () => {
//     const reqInfo = {
//       apiBase: "api/",
//       req: {
//         url: "",
//         body: {}
//       },
//       collectionName: "",
//       collection: {},
//       headers: {
//         lazyInit: jasmine.createSpy()
//       },
//       methos: "post",
//       id: undefined,
//       query: {},
//       resourceUrl: "api/login/",
//       url: "http://localhost:8080/api/login",
//       utils: {
//         createResponse$: jasmine.createSpy()
//       }
//     };
//     const service = TestBed.get(DataService);

//     expect(service.post(reqInfo)).toEqual(undefined);
//   });

//   it('should send the email when route is forgot-password',()=>{
//     const reqInfo = {
//       apiBase: "api/",
//       req: {
//         url: "",
//         body: {emai:'me@me.com'}
//       },
//       collectionName: "forgot-password",
//       collection: {},
//       headers: {
//         lazyInit: jasmine.createSpy()
//       },
//       methos: "post",
//       id: undefined,
//       query: {},
//       resourceUrl: "api/forgot-password/",
//       url: "http://localhost:8080/api/forgot-password",
//       utils: {
//         createResponse$: jasmine.createSpy()
//       }
//     };
//     const service=TestBed.get(DataService)
    
//     service.post(reqInfo)

//     expect(service.sendEmail).toBeDefined()
//   })

//   it('should override the put method',()=>{
//     const reqInfo = {
//       apiBase: "api/",
//       req: {
//         url: "",
//         body: {}
//       },
//       collectionName: "reset-password",
//       collection: {},
//       headers: {
//         lazyInit: jasmine.createSpy()
//       },
//       methos: "put",
//       id: undefined,
//       query: {},
//       resourceUrl: "api/forgot-password/",
//       url: "http://localhost:8080/api/forgot-password",
//       utils: {
//         createResponse$: jasmine.createSpy()
//       }
//     };
//     const service=TestBed.get(DataService)

//     service.put(reqInfo)

//     expect(service.reset).toBeDefined()
//   })

//   it('should not override the put method',()=>{
//     const reqInfo = {
//       apiBase: "api/",
//       req: {
//         url: "",
//         body: {}
//       },
//       collectionName: "",
//       collection: {},
//       headers: {
//         lazyInit: jasmine.createSpy()
//       },
//       methos: "put",
//       id: undefined,
//       query: {},
//       resourceUrl: "api/forgot-password/",
//       url: "http://localhost:8080/api/",
//       utils: {
//         createResponse$: jasmine.createSpy()
//       }
//     };
//     const service=TestBed.get(DataService)

//     service.put(reqInfo)

//     expect(service.reset).toBeDefined()
//   })
// });
