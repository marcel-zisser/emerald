import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { BackendService } from '@emerald/services';
import { ApiEndpoint, ApiRoutes, User } from '@emerald/models';
import { toSignal } from '@angular/core/rxjs-interop';
import { first } from 'rxjs';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ReviewerListComponent } from './reviewer-list/reviewer-list.component';
import { CriteriaForm, FormCriterion } from '../criteria/criteria.form';
import { ReviewerForm } from './reviewer.form';

@Component({
  selector: 'checklist-add-reviewer',
  imports: [
    CommonModule,
    MatFormField,
    MatAutocomplete,
    MatOption,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatInput,
    MatLabel,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatList,
    MatListItem,
    MatIconButton,
    MatIcon,
    ReviewerListComponent,
  ],
  templateUrl: './add-reviewer.component.html',
  styleUrl: './add-reviewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AddReviewerComponent {
  form = input.required<ReviewerForm>();

  private readonly backendService = inject(BackendService);
  private readonly fb = inject(NonNullableFormBuilder);

  users = signal<User[]>([]);
  selectedUsers = signal<User[]>([]);

  constructor() {
    this.backendService
      .doGet<User[]>(ApiRoutes.get(ApiEndpoint.User))
      .pipe(first())
      .subscribe((users) => {
        this.users.set(users);
      });
  }

  /**
   * Moves a user to the selected users
   * @param movedUser the user to add
   */
  addSelectedUser(movedUser: User) {
    this.selectedUsers.update((users) => [...users, movedUser]);
    this.users.update((users) =>
      users.filter((user) => user.uuid !== movedUser.uuid)
    );

    this.form().controls.reviewers.push(
      this.fb.group({
        uuid: [movedUser.uuid, Validators.required],
      })
    );
  }

  /**
   * Moves a user from the selected users
   * @param movedUser the user to remove
   */
  removeSelectedUser(movedUser: User) {
    this.selectedUsers.update((users) =>
      users.filter((user) => user.uuid !== movedUser.uuid)
    );
    this.users.update((users) => [...users, movedUser]);

    const index = this.form().controls.reviewers.value.indexOf({
      uuid: movedUser.uuid,
    });
    this.form().controls.reviewers.removeAt(index);
  }
}
