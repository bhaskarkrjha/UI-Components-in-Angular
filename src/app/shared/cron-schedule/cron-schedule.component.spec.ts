import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronScheduleComponent } from './cron-schedule.component';

describe('CronScheduleComponent', () => {
  let component: CronScheduleComponent;
  let fixture: ComponentFixture<CronScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CronScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CronScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
