import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronJobSchedulerComponent } from './cron-job-scheduler.component';

describe('CronJobSchedulerComponent', () => {
  let component: CronJobSchedulerComponent;
  let fixture: ComponentFixture<CronJobSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CronJobSchedulerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CronJobSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
