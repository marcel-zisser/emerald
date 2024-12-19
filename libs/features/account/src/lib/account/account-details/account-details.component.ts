import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiEndpoint, ApiRoutes, Role, User } from '@emerald/models';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { BackendService } from '@emerald/services';
import { first } from 'rxjs';

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

  private currentUser: User | undefined;

  protected userForm: FormGroup;

  user = input<User | undefined>();

  constructor() {
    this.userForm = this.formBuilder.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        username: [null, Validators.required],
        email: [null , [Validators.required, Validators.email]],
        role: new FormControl({ value: null, disabled: true })
      });

    effect(() => {
      this.currentUser = this.user();
      this.setUser();
    });

  }

  protected onSubmit(): void {
    if (this.userForm.valid) {
      const user = {
        ...this.userForm.value,
        uuid: this.currentUser?.uuid
      } satisfies User;

      this.backendService.doPut<User, User>(ApiRoutes.get(ApiEndpoint.User), user)
        .pipe(first())
        .subscribe( data => this.currentUser = data);
    } else {
      this.markFormAsInvalid();
    }
  }

  protected resetForm() {
    this.userForm.reset();
    this.setUser();
  }

  private setUser(): void {
    if (this.currentUser) {
      this.userForm.setValue({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        username: this.currentUser.username,
        email: this.currentUser.email,
        role: this.currentUser.role
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
