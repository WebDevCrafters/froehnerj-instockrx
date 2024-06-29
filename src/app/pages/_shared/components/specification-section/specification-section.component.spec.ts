import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationSectionComponent } from './specification-section.component';

describe('SpecificationSectionComponent', () => {
  let component: SpecificationSectionComponent;
  let fixture: ComponentFixture<SpecificationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificationSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
