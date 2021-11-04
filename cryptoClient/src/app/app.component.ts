import { Component } from '@angular/core';
import { AccountsService } from './services/accounts/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public accountService: AccountsService) { }

  logout() {
    this.accountService.doLogout()
  }
}
