import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GameCardComponent } from './component/games/game-card/game-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatToolbarRow, MatToolbar, MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SocialLoginComponent} from './social-login/social-login.component'
import { MessageComponent } from './common/component/message/message.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        BrowserAnimationsModule
        
        
      ],
      declarations: [
        AppComponent,MessageComponent,GameCardComponent,SocialLoginComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


});
