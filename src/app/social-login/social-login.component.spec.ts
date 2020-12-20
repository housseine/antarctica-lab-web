import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  MatIconModule } from '@angular/material';

import { SocialLoginComponent } from './social-login.component';


describe('SocialLoginComponent', () => {
  let component: SocialLoginComponent;
  let fixture: ComponentFixture<SocialLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
              MatIconModule, 
    ],
      declarations: [ SocialLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
