import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css',
  '../../assets/lib/animate/animate.min.css',
  '../../assets/lib/owlcarousel/assets/owl.carousel.min.css',
  '../../assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
  '../../assets/css/bootstrap.min.css',
  '../../assets/css/style.css',
  ]
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
