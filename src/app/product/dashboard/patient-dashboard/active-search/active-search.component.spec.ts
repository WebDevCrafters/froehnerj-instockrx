import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSearchComponent } from './active-search.component';

describe('ActiveSearchComponent', () => {
  let component: ActiveSearchComponent;
  let fixture: ComponentFixture<ActiveSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
