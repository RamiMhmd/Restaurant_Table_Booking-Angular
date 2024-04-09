import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { commonStyles } from '../app.constants'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',...commonStyles]
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';
  constructor(private formBuilder: FormBuilder,  private loginService: LoginService, private router: Router ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      // Assuming you have a loginService property of type LoginService
      const loginResult = this.loginService?.loginUser(email, password);

      if (loginResult?.success) {
        // Handle successful login
        this.loginError = '';
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', loginResult.name || ''); // Storing user's name in local storage, or empty string if undefined
        localStorage.setItem('email', loginResult.email || ''); 
        this.router.navigate(['/landing']);
      } else {
        // Handle failed login
        this.loginError = loginResult?.error || 'Login failed';
      }

    }

    else {
      // Mark fields as touched to display validation errors
      this.markFormGroupTouched(this.loginForm);
    }
  }

  // Function to mark all fields in a form group as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
