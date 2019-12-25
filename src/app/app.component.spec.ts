import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { CollaborateurCardComponent } from './collaborateur-card/collaborateur-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatToolbarModule, MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]),MatCardModule,MatIconModule,MatToolbarModule,RouterModule,MatSidenavModule,BrowserAnimationsModule],
      declarations: [
        AppComponent,MessageComponent,CollaborateurCardComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'IZZIE'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('IZZIE');
  });

});
