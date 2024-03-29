import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import {GameCreationComponent} from './components/game-creation/game-creation.component'
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AngularMaterialComponent } from './components/angular-material/angular-material.component';
import { Board2Component } from './components/board2/board2.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'play', component: GameComponent },
  { path: 'create', component: GameCreationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: SignInComponent},
  // { path: 'Test', component: AngularMaterialComponent},
  { path: 'Test', component: Board2Component},
  { path: 'profile', component: ProfileComponent /*, canActivate: [AuthGuardService]*/},
  { path: 'home', component: HomeComponent}

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
