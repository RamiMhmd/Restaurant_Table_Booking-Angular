import { Injectable } from '@angular/core';
import { USERS } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  registerUser(name: string, email: string, password: string): string | null {
    // Check if email already exists
    const existingUser = USERS.find(user => user.email === email);
    if (existingUser) {
      return 'Email already exists';
    } else {
      // Generate new user id
      const newUserId = USERS.length + 1;
      // Add new user to USERS array
      USERS.push({
        id: newUserId,
        name: name,
        email: email,
        password: password
      });
      return null; // No error, registration successful
    }
  }
}
