import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateurDetailsComponent } from './collaborateur-details.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('GameDetailsComponent', () => {
  let component: CollaborateurDetailsComponent;
  let fixture: ComponentFixture<CollaborateurDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,RouterModule.forRoot([]),HttpClientModule],
      declarations: [CollaborateurDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborateurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
