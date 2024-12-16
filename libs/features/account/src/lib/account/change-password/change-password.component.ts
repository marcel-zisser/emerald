import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Roles } from '@emerald/models';

@Component({
  selector: 'account-change-password',
  imports: [CommonModule, FormsModule, MatButton, MatCard, MatCardHeader, MatCardTitle, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ChangePasswordComponent {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly Roles = Roles;
  protected changePasswordForm: FormGroup;
  protected newPassword: string | null = null;
  protected newPasswordRepeat: string | null = null;
  protected oldPassword: string | null = null;

  constructor() {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: [this.newPassword ?? '', Validators.required],
      newPasswordRepeat: [this.newPasswordRepeat ?? '', Validators.required],
      oldPassword: [this.oldPassword ?? '', Validators.required ]
    });
  }

  protected onSubmit(): void {
    if (this.changePasswordForm.valid) {
      console.log(this.newPasswordRepeat);
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
