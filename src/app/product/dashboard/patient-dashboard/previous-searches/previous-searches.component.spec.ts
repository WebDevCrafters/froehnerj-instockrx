import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousSearchesComponent } from './previous-searches.component';

describe('PreviousSearchesComponent', () => {
  let component: PreviousSearchesComponent;
  let fixture: ComponentFixture<PreviousSearchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousSearchesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviousSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
