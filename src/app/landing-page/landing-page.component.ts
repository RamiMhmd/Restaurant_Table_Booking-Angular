import { Component } from '@angular/core';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
   styleUrls: [
    './landing-page.component.css',
    '../../assets/lib/animate/animate.min.css',
    '../../assets/lib/owlcarousel/assets/owl.carousel.min.css',
    '../../assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
    '../../assets/css/bootstrap.min.css',
    '../../assets/css/style.css',
  ]
})
export class LandingPageComponent {
    isLoggedIn: boolean;

    constructor() {
      // Check local storage for login status
      const isLoggedInStorage = localStorage.getItem('isLoggedIn');
      this.isLoggedIn = isLoggedInStorage ? JSON.parse(isLoggedInStorage) : false;
    }
    
    userName = localStorage?.getItem('userName');
    restaurantName: string = 'Restaurant Name';
    restaurantDescription: string = 'Welcome to our restaurant!';
    advertisements: any[] = [
        { image: 'path/to/image1.jpg', description: 'Special Offer 1' },
        { image: 'path/to/image2.jpg', description: 'Special Offer 2' }
    ];
}