import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css',
  '../../assets/lib/animate/animate.min.css',
  '../../assets/lib/owlcarousel/assets/owl.carousel.min.css',
  '../../assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
  '../../assets/css/bootstrap.min.css',
  '../../assets/css/style.css',
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerError: string = '';
  constructor(private formBuilder: FormBuilder,  private registerService: RegisterService, private router: Router ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const name = this.registerForm.value.name;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;

      const registrationError = this.registerService.registerUser(name, email, password);
      if (registrationError) {
        this.registerError = registrationError;
      } else {
        // Registration successful, navigate to login page or any other page
        this.router.navigate(['/login']);
      }
    } else {
      // Mark fields as touched to display validation errors
      this.markFormGroupTouched(this.registerForm);
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
