import { Component } from '@angular/core';
import { commonStyles } from '../app.constants'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css',...commonStyles]
})
export class NavbarComponent {
  isLoggedIn: boolean;

  constructor() {
    // Check local storage for login status
    const isLoggedInStorage = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = isLoggedInStorage ? JSON.parse(isLoggedInStorage) : false;
  }

  logout() {
    // Clear local storage and update isLoggedIn
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
