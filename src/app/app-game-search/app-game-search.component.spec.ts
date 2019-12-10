import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGameSearchComponent } from './app-game-search.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('AppGameSearchComponent', () => {
  let component: AppGameSearchComponent;
  let fixture: ComponentFixture<AppGameSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppGameSearchComponent ],
      imports: [RouterModule,HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGameSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
