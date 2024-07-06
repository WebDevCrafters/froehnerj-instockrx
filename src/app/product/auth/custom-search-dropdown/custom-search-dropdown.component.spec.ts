import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSearchDropdownComponent } from './custom-search-dropdown.component';

describe('CustomSearchDropdownComponent', () => {
  let component: CustomSearchDropdownComponent;
  let fixture: ComponentFixture<CustomSearchDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSearchDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomSearchDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
