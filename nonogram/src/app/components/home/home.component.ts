import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login');
  }

  redirectToRegister() {
    this.router.navigateByUrl('/register');
  }

}
