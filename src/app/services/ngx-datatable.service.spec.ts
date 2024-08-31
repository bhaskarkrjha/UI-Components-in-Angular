import { TestBed } from '@angular/core/testing';

import { NgxDatatableService } from './ngx-datatable.service';

describe('NgxDatatableService', () => {
  let service: NgxDatatableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDatatableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
