import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';

import { HomeSliderComponent } from './home-slider.component';

describe('HomeSliderComponent', () => {
  let component: HomeSliderComponent;
  let fixture: ComponentFixture<HomeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[MatIconModule],
      declarations: [ HomeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
