import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  error: boolean = false;

  constructor(
    private auth: AuthenticationService,
     private router: Router,
     //private route: ActivatedRouteSnapshot
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/home');
      /*let params = this.route.queryParams
      let redirectURL = params['redirectURL']
      this.router.navigateByUrl('/'+ redirectURL);*/
    }, (err) => {
      this.error = true
      console.error(err);
    });
  }

  redirectToRegister() {
    this.router.navigateByUrl('/register');

  }

}
