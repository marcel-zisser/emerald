import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Role, User } from '@emerald/models';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'admin-user-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIcon,
    MatSuffix
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<UserDetailsComponent>);
  private readonly dialogData = inject(MAT_DIALOG_DATA);

  protected readonly Roles = Role;
  protected userForm: FormGroup;
  protected userToEdit: User | null = null;

  hide = signal(true);

  constructor() {
    this.userToEdit = this.dialogData;

    this.userForm = this.formBuilder.group({
      firstName: [this.userToEdit?.firstName ?? '', Validators.required],
      lastName: [this.userToEdit?.lastName ?? '', Validators.required],
      username: [this.userToEdit?.username ?? '', Validators.required],
      email: [
        this.userToEdit?.email ?? '',
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required],
      role: [this.userToEdit?.role ?? '', Validators.required],
    });
  }

  hidePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  protected onSubmit(): void {
    if (this.userForm.valid) {
      let user: User;

      if (!this.userToEdit) {
        user = {
          ...this.userForm.value
        } satisfies User;
      } else {
        user = {
          ...this.userToEdit,
          ...this.userForm.value,
        };
      }

      this.dialogRef.close(user);
    } else {
      this.markFormAsInvalid();
    }
  }

  private markFormAsInvalid() {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.userForm.get(field);
      control?.markAsTouched({ onlySelf: true });
      control?.markAsDirty();
    });
  }
}
