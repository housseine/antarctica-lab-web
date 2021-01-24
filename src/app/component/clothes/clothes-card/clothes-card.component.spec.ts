import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardContent, MatCardModule, MatIconModule } from '@angular/material';
import { HomeSliderComponent } from 'src/app/common/component/home-slider/home-slider.component';

import { ClothesCardComponent } from './clothes-card.component';

describe('ClothesCardComponent', () => {
  let component: ClothesCardComponent;
  let fixture: ComponentFixture<ClothesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatCardModule,
        MatIconModule,
        HttpClientModule
      ],
      declarations: [ ClothesCardComponent,HomeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
