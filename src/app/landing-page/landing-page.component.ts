import { Component } from '@angular/core';
import { commonStyles } from '../app.constants'
@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
   styleUrls: [
    './landing-page.component.css',...commonStyles]
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