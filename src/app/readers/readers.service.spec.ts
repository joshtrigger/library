import { TestBed } from '@angular/core/testing';

import { ReadersService } from './readers.service';

describe('ReadersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadersService = TestBed.get(ReadersService);
    expect(service).toBeTruthy();
  });
});
