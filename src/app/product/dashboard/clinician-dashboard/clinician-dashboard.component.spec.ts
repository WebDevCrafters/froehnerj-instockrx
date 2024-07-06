import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicianDashboardComponent } from './clinician-dashboard.component';

describe('ClinicianDashboardComponent', () => {
  let component: ClinicianDashboardComponent;
  let fixture: ComponentFixture<ClinicianDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicianDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicianDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
