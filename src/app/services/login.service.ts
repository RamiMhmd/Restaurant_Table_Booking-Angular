import { Injectable } from '@angular/core';
import { USERS } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  loginUser(email: string, password: string): { success: boolean, name?: string, error?: string , email?:string } {
    const user = USERS.find(u => u.email === email && u.password === password);

    if (user) {
      return { success: true, name: user.name , email:user.email}; // Login successful
    } else {
      return { success: false, error: 'Invalid email or password' }; // Login failed
    }
  }
}
