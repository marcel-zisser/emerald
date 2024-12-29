import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '@emerald/authentication';

@Component({
  selector: 'em-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatCardActions,
    MatLabel,
    MatError,
    MatCardHeader,
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;

  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly snackbarService = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.loginForm.disable();

      this.authenticationService
        .login(username, password)
        .pipe(first())
        .subscribe({
          next: (response) => {
            this.authenticationService.saveToken(response.accessToken);
            this.authenticationService.authenticate();

            this.snackbarService.dismiss();
            this.router.navigate(['']);
          },
          error: () => {
            this.loginForm.reset();
            this.markFormAsInvalid();
            this.loginForm.enable();
            this.snackbarService.open(
              'Login failed. Please try again!',
              'Dismiss',
              {
                verticalPosition: 'top',
                panelClass: ['error-snack'],
              }
            );
          },
        });
    }
  }

  onForgotPassword() {
    console.log('Forgot Password clicked');
    // Add your forgot password logic here
  }

  private markFormAsInvalid() {
    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      control?.markAsTouched({ onlySelf: true });
      control?.markAsDirty();
      control?.setErrors({ wrongCredentials: true })
    });
  }
}
