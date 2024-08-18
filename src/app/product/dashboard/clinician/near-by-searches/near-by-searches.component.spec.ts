import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearBySearchesComponent } from './near-by-searches.component';

describe('NearBySearchesComponent', () => {
  let component: NearBySearchesComponent;
  let fixture: ComponentFixture<NearBySearchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearBySearchesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NearBySearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
