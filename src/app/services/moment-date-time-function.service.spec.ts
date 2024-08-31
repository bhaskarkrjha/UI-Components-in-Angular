import { TestBed } from '@angular/core/testing';

import { MomentDateTimeFunctionService } from './moment-date-time-function.service';

describe('MomentDateTimeFunctionService', () => {
  let service: MomentDateTimeFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomentDateTimeFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
