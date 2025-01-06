import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { User } from '@emerald/models';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'checklist-reviewer-list',
  imports: [
    MatIcon,
    MatIconButton,
    MatList,
    MatListItem,
    MatFormField,
    MatInput,
  ],
  templateUrl: './reviewer-list.component.html',
  styleUrl: './reviewer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ReviewerListComponent {
  filterable = input<boolean>(false);
  icon = input<string>('add');
  users = input.required<User[]>();

  remove = output<User>();

  protected filterString = signal<string>('');

  filteredUsers = computed(() =>
    this.users()
      .filter(
        (user) =>
          user.firstName.toLowerCase().includes(this.filterString().toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.filterString().toLowerCase()) ||
          user.username?.toLowerCase().includes(this.filterString().toLowerCase()) ||
          user.email?.toLowerCase().includes(this.filterString().toLowerCase())
      )
      .sort((a, b) => a.lastName.localeCompare(b.lastName))
  );

  removeUser(user: User) {
    this.remove.emit(user);
  }

  updateQuery(event: Event) {
    this.filterString.set(
      (event.target as HTMLInputElement).value
    );
  }
}
