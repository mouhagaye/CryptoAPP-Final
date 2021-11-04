import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  number_phone : String;
  prenom : String;
  nom : String;

  constructor(
    private accountService : AccountsService
  ) { }

  ngOnInit(): void {
    this.number_phone = localStorage.getItem('number_phone');
    this.prenom = localStorage.getItem('prenom');
    this.nom = localStorage.getItem('nom');
    console.log(localStorage);
  }

  logout() {
    this.accountService.doLogout()
  }

}
