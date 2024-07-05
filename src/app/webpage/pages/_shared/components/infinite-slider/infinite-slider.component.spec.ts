import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteSliderComponent } from './infinite-slider.component';

describe('InfiniteSliderComponent', () => {
  let component: InfiniteSliderComponent;
  let fixture: ComponentFixture<InfiniteSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfiniteSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
