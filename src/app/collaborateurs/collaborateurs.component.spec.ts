import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateurComponent } from './collaborateurs.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('collaborateursComponent', () => {
  let component: CollaborateurComponent;
  let fixture: ComponentFixture<CollaborateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,RouterModule,HttpClientModule],
      declarations: [ CollaborateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
