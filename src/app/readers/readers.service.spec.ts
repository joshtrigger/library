import { TestBed } from '@angular/core/testing';

import { ReadersService } from './readers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('ReadersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ReadersService = TestBed.get(ReadersService);
    expect(service).toBeTruthy();
  });
});
