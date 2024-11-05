import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailForm2Component } from './detail-form-2.component';

describe('DetailForm2Component', () => {
  let component: DetailForm2Component;
  let fixture: ComponentFixture<DetailForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailForm2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
