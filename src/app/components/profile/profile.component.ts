import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  details!: UserDetails;

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.auth.profile().subscribe(user => {
      this.details = this.auth.getUserDetails();
      console.log(user)
      console.log(this.details)
    }, (err) => {
      console.error(err);
      //console.log(user)
      console.log(this.details)
    });
  }

}
