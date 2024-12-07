import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '@emerald/services';
import { catchError, first, of } from 'rxjs';
import { Router } from '@angular/router';
import { Feature, FeatureRoutes } from '@emerald/models';
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
            this.router.navigate([FeatureRoutes.get(Feature.Admin)]);
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
