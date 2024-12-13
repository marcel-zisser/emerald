import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserTableService } from './user-table.service';
import { User } from '@emerald/models';
import { DatePipe, NgClass } from '@angular/common';
import { of, first, filter, switchMap, take } from 'rxjs';

@Component({
  selector: 'admin-user-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule,
    DatePipe,
    NgClass,
  ],
  providers: [],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly userService = inject(UserTableService);
  private readonly snackBar = inject(MatSnackBar);

  protected users: WritableSignal<User[]> = signal([]);

  protected displayedColumns: string[] = ['lastName', 'firstName', 'email', 'actions'];


  ngOnInit(): void {
    this.initUsers();
  }

  trackByUserId(index: number, user: User): string {
    return user.userId;
  }
  /**
   * Opens a dialog to add a new user to the club
   */
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '75%',
      height: '80%',
      data: null,
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter((result) => result !== null),
        switchMap((newUser) => this.userService.createUser(newUser))
      )
      .subscribe((createdUser) => {
        this.users.update((users) => [...users, createdUser]);
        this.snackBar.open('User added successfully!', 'Close', {
          duration: 3000,
        });
      });
  }

  /**
   * Opens a dialog to edit an existing user
   */
  onEditUserClicked(user: User): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '75%',
      height: '80%',
      data: user,
    });

    let updated: User;

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter((result) => result !== null),
        switchMap((updatedUser) => {
          updated = updatedUser;
          return this.userService.updateUser(updatedUser);
        })
      )
      .subscribe((updateResult) => {
        if (updateResult.affected !== 0) {
          this.users.update((users) =>
            users.map((u) =>
              u.userId === updated.userId ? updated : u
            )
          );
          this.snackBar.open('User updated successfully!', 'Close', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Error updating user.', 'Close', {
            duration: 3000,
          });
        }
      });
  }

  /**
   * Confirms and deletes a user
   */
  onDeleteUserClicked(user: User): void {
    const confirmation = confirm(
      `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
    );

    if (confirmation) {
      this.userService
        .deleteUser(user)
        .pipe(take(1))
        .subscribe((deleteResult) => {
          if (deleteResult.affected !== 0) {
            this.users.set(
              this.users().filter((u) => u.userId !== user.userId)
            );
            this.snackBar.open('User deleted successfully!', 'Close', {
              duration: 3000,
            });
          } else {
            this.snackBar.open('Error deleting user.', 'Close', {
              duration: 3000,
            });
          }
        });
    }
  }

  /**
   * Initialize users
   * @private
   */
  private initUsers(): void {
    this.userService
      .getUsers()
      .pipe(take(1))
      .subscribe((users) => {
        this.users.set(users);
      });
  }
}
