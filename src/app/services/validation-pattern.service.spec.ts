import { TestBed } from '@angular/core/testing';

import { ValidationPatternService } from './validation-pattern.service';

describe('ValidationPatternService', () => {
  let service: ValidationPatternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationPatternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
