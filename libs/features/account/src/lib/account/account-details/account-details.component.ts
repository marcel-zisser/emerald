import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiEndpoint, ApiRoutes, Roles, User } from '@emerald/models';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { BackendService } from '@emerald/services';
import { first } from 'rxjs';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

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
  private readonly backendService = inject(BackendService);

  protected readonly Roles = Roles;
  protected userForm: FormGroup;

  user = input<User | undefined>();

  constructor() {
    this.userForm = this.formBuilder.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        username: [null, Validators.required],
        email: [
          this.user()?.email ?? '',
          [Validators.required, Validators.email]
        ],
        role: new FormControl({ value: this.user()?.role, disabled: true })
      });

    effect(() => {
      this.setUser();
    })

  }

  protected onSubmit(): void {
    if (this.userForm.valid) {
      const user = {
        ...this.userForm.value,
        uuid: this.user()?.uuid
      } satisfies User;

      this.backendService.doPut<User, User>(ApiRoutes.get(ApiEndpoint.User), user)
        .pipe(first())
        .subscribe( data => console.log(data));
    } else {
      this.markFormAsInvalid();
    }
  }

  resetForm() {
    this.userForm.reset();
    this.setUser();
  }

  private setUser(): void {
    const user = this.user();

    if (user) {
      this.userForm.setValue({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role
      });
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
