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
import { ScoreBoardComponent } from './components/score-board/score-board.component';
import { SortByComponent } from './components/sort-by/sort-by.component';
import { AngularMaterialComponent } from './components/angular-material/angular-material.component';

import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Board2Component } from './components/board2/board2.component';

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
    VideoComponent,
    ScoreBoardComponent,
    SortByComponent,
    AngularMaterialComponent,
    Board2Component
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
