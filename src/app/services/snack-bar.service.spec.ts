import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);
    expect(service).toBeTruthy();
  });
});
