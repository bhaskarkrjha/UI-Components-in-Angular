import { TestBed } from '@angular/core/testing';

import { FormatColumnService } from './format-column.service';

describe('FormatColumnService', () => {
  let service: FormatColumnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatColumnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
