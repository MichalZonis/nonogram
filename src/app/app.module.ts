import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { GameComponent } from './components/game/game.component';
import { HintsComponent } from './components/hints/hints.component';
import { ClockComponent } from './components/clock/clock.component';
import { AppRoutingModule } from './app-routing.module';
import { GameCreationComponent } from './components/game-creation/game-creation.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GalleryTileComponent } from './components/gallery-tile/gallery-tile.component';
import { SizeFormComponent } from './components/size-form/size-form.component';
import { PuzzleFromImageComponent } from './components/puzzle-from-image/puzzle-from-image.component';
import { VideoComponent } from './components/video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
    HintsComponent,
    ClockComponent,
    GameCreationComponent,
    LoginComponent,
    SignInComponent,
    HomeComponent,
    ProfileComponent,
    GalleryComponent,
    GalleryTileComponent,
    SizeFormComponent,
    PuzzleFromImageComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
