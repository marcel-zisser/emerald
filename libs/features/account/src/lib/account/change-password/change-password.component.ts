import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ApiEndpoint, ApiRoutes, User } from '@emerald/models';
import { matchValuesValidator } from './match-values.validator';
import { first } from 'rxjs';
import { BackendService } from '@emerald/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'account-change-password',
  imports: [FormsModule, MatButton, MatCard, MatCardHeader, MatCardTitle, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatIconButton, MatSuffix, MatIcon],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ChangePasswordComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly backendService = inject(BackendService);
  private readonly snackbar = inject(MatSnackBar);

  protected changePasswordForm: FormGroup;

  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  hideCurrentPassword = signal(true);

  constructor() {
    this.changePasswordForm = this.formBuilder.group({
      password: [null, Validators.required],
      confirmPassword: [null, [Validators.required]],
      currentPassword: [null, Validators.required ]
    },
      {
        validators: [matchValuesValidator('password', 'confirmPassword')]
      });
  }

  hidePasswordEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  hideCurrentPasswordEvent(event: MouseEvent) {
    this.hideCurrentPassword.set(!this.hideCurrentPassword());
    event.stopPropagation();
  }

  hideConfirmPasswordEvent(event: MouseEvent) {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
    event.stopPropagation();
  }

  protected onSubmit(): void {
    if (this.changePasswordForm.valid) {
      this.backendService.doPatch<User, User>(ApiRoutes.get(ApiEndpoint.User), this.changePasswordForm.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.changePasswordForm.reset();

            Object.keys(this.changePasswordForm.controls).forEach(controlName => {
              const control = this.changePasswordForm.get(controlName);
              control?.setErrors(null);
            });

            this.snackbar.open('Password changed successfully.', 'OK', {
              verticalPosition: 'top',
            })
          },
          error: (error) => {
            this.snackbar.open('The following error occurred: ' + error.statusText, 'OK', {
              verticalPosition: 'top',
            })
          }

        });
    } else {
      this.markFormAsInvalid();
    }
  }

  private markFormAsInvalid() {
    Object.keys(this.changePasswordForm.controls).forEach((field) => {
      const control = this.changePasswordForm.get(field);
      control?.markAsTouched({ onlySelf: true });
      control?.markAsDirty();
    });
  }

}
