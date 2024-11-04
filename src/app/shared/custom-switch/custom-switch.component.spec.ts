import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSwitchComponent } from './custom-switch.component';

describe('CustomSwitchComponent', () => {
  let component: CustomSwitchComponent;
  let fixture: ComponentFixture<CustomSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomSwitchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
