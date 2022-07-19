import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import {GameCreationComponent} from './components/game-creation/game-creation.component'
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'play', component: GameComponent },
  { path: 'create', component: GameCreationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

//TOOO: implement routing https://angular.io/tutorial/toh-pt5