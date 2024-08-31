import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSearchActionComponent } from './table-search-action.component';

describe('TableSearchActionComponent', () => {
  let component: TableSearchActionComponent;
  let fixture: ComponentFixture<TableSearchActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableSearchActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSearchActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
