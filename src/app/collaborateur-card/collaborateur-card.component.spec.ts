import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateurCardComponent } from './collaborateur-card.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('CollaborateurCardComponent', () => {
  let component: CollaborateurCardComponent;
  let fixture: ComponentFixture<CollaborateurCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,MatCardModule,HttpClientModule,RouterModule,RouterTestingModule],
      declarations: [ CollaborateurCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborateurCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
