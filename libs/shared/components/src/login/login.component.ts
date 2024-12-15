import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
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
import { SidebarService } from '../sidebar';
import { jwtDecode } from 'jwt-decode';
import { JwtTokenInformation } from '@emerald/models';

@Component({
  selector: 'em-login',
  standalone: true,
  imports: [
    CommonModule,
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
    MatCardSubtitle,
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;

  private readonly authenticationService = inject(AuthenticationService);
  private readonly sidebarService = inject(SidebarService);
  private readonly router = inject(Router);
  private readonly snackbarService = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authenticationService
        .login(email, password)
        .pipe(first())
        .subscribe({
          next: (response) => {
            this.authenticationService.saveToken(response.accessToken);
            this.authenticationService.authenticate();

            this.snackbarService.dismiss();
            this.router.navigate(['']);
          },
          error: () => {
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
}
