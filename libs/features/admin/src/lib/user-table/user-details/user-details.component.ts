import { Component, inject } from '@angular/core';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Roles, User } from '@emerald/models';
import { v4 as uuid } from 'uuid';
import { UserTableService } from '../user-table.service';
import { MatGridListModule } from '@angular/material/grid-list';

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
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<UserDetailsComponent>);
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  private readonly usersService = inject(UserTableService);

  protected readonly Roles = Roles;
  protected userForm: FormGroup;
  protected userToEdit: User | null = null;

  constructor() {
    this.userToEdit = this.dialogData;

    this.userForm = this.formBuilder.group({
      firstName: [this.userToEdit?.firstName ?? '', Validators.required],
      lastName: [this.userToEdit?.lastName ?? '', Validators.required],
      email: [
        this.userToEdit?.email ?? '',
        [Validators.required, Validators.email],
      ],
      role: ['', Validators.required],
    });
  }

  protected onSubmit(): void {
    if (this.userForm.valid) {
      let user: User;

      if (!this.userToEdit) {
        user = {
          ...this.userForm.value,
          uuid: uuid(),
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

  protected onCancel(): void {
    this.dialogRef.close();
  }

  private markFormAsInvalid() {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.userForm.get(field);
      control?.markAsTouched({ onlySelf: true });
      control?.markAsDirty();
    });
  }
}
