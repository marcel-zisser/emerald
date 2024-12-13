import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '@emerald/models';
import { v4 as uuid } from 'uuid';
import { UserTableService } from '../user-table.service';

@Component({
  selector: 'admin-user-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<UserDetailsComponent>);
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  private readonly usersService = inject(UserTableService);

  protected userForm: FormGroup;
  protected userToEdit: User | null = null;

  constructor() {
    this.userToEdit = this.dialogData;

    this.userForm = this.formBuilder.group({
      firstName: [this.userToEdit?.firstName ?? '', Validators.required],
      lastName: [this.userToEdit?.lastName ?? '', Validators.required],
      password: [this.userToEdit?.password ?? '', Validators.required],
      email: [
        this.userToEdit?.email ?? '',
        [Validators.required, Validators.email],
      ],
    });
  }

  protected saveUser(): void {
    if (this.userForm.valid) {
      let user: User;

      if (!this.userToEdit) {
        user = {
          ...this.userForm.value,
          userId: uuid(),
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
