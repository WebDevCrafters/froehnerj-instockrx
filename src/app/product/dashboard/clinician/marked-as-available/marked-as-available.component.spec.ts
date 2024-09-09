import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkedAsAvailableComponent } from './marked-as-available.component';

describe('MarkedAsAvailableComponent', () => {
  let component: MarkedAsAvailableComponent;
  let fixture: ComponentFixture<MarkedAsAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkedAsAvailableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarkedAsAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
