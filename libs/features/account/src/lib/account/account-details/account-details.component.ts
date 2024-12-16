import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User, Roles } from '@emerald/models';
import { v4 as uuid } from 'uuid';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'account-details',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatCard,
    MatCardTitle,
    MatCardHeader],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AccountDetailsComponent {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly Roles = Roles;
  protected userForm: FormGroup;

  user = input<User | undefined>();

  constructor() {
    this.userForm = this.formBuilder.group({
      firstName: [this.user()?.firstName ?? '', Validators.required],
      lastName: [this.user()?.lastName ?? '', Validators.required],
      email: [
        this.user()?.email ?? '',
        [Validators.required, Validators.email],
      ],
      role: new FormControl({value: this.user()?.role, disabled: true}),
    });
  }

  protected onSubmit(): void {
    if (this.userForm.valid) {
      let user: User;

      if (!this.user()) {
        user = {
          ...this.userForm.value,
          uuid: uuid(),
        } satisfies User;
      } else {
        user = {
          ...this.user(),
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
