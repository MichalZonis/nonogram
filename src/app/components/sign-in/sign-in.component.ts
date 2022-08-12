import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload  } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    credentials: TokenPayload = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
     private router: Router

  ) { }

  ngOnInit(): void {
  }

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

}
