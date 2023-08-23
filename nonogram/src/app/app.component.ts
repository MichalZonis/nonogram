import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nonogram';

  constructor(
    public auth: AuthenticationService
    ) {
  }

  ngOnDestroy() {
    this.auth.logout()
  }
}
