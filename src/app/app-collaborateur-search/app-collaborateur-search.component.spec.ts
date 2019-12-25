import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCollaborateurSearchComponent } from './app-collaborateur-search.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('AppcollaborateurSearchComponent', () => {
  let component: AppCollaborateurSearchComponent;
  let fixture: ComponentFixture<AppCollaborateurSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCollaborateurSearchComponent ],
      imports: [RouterModule,HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCollaborateurSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
