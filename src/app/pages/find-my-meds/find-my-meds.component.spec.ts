import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMyMedsComponent } from './find-my-meds.component';

describe('FindMyMedsComponent', () => {
  let component: FindMyMedsComponent;
  let fixture: ComponentFixture<FindMyMedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindMyMedsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindMyMedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
