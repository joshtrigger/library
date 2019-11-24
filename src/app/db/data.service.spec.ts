import { TestBed } from "@angular/core/testing";

import { DataService } from "./data.service";
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe("DataService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule]
  }));

  it("should be created", () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it("should create the database", () => {
    const service: DataService = TestBed.get(DataService);
    service.createDb();
    expect(service.createDb).toBeDefined();
  });
  
  xit('should call the post function',()=>{
    
  })
});
