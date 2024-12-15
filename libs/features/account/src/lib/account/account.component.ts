import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserTableService } from '@emerald/admin';
import { Roles, User } from '@emerald/models';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'account-account',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  standalone: true,
})
export class AccountComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly usersService = inject(UserTableService);

  protected readonly Roles = Roles;
  protected userForm: FormGroup;
  protected userToEdit: User | null = null;

  constructor() {
    this.userForm = this.formBuilder.group({
      firstName: [this.userToEdit?.firstName ?? '', Validators.required],
      lastName: [this.userToEdit?.lastName ?? '', Validators.required],
      email: [
        this.userToEdit?.email ?? '',
        [Validators.required, Validators.email],
      ],
      role: [''],
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
