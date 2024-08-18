import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSearchesComponent } from './active-searches.component';

describe('ActiveSearchesComponent', () => {
  let component: ActiveSearchesComponent;
  let fixture: ComponentFixture<ActiveSearchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveSearchesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
