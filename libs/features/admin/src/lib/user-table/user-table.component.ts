import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  WritableSignal,
  signal,
  effect,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { UserDetailsComponent } from './user-details';
import { UserTableService } from './user-table.service';
import { User } from '@emerald/models';
import { first, filter, switchMap, take } from 'rxjs';
import { WarningDialogComponent } from '@emerald/dialog';

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

  private users: WritableSignal<User[]> = signal([]);

  @ViewChild(MatSort) sort!: MatSort;
  protected dataSource = new MatTableDataSource<User>([]);

  protected displayedColumns: string[] = [
    'lastName',
    'firstName',
    'email',
    'role',
    'actions',
  ];

  constructor() {
    effect(() => {
      this.dataSource.data = this.users();
    });
  }

  ngOnInit(): void {
    this.initUsers();
    this.dataSource.sort = this.sort;
  }

  trackByUserId(index: number, user: User): string {
    return user.uuid;
  }

  /**
   * Opens a dialog to add a new user to the club
   */
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '75%',
      data: null,
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter((result) => result !== ''),
        switchMap((newUser) => this.userService.createUser(newUser))
      )
      .subscribe((createdUser) => {
        this.users.update((users) => [...users, createdUser]);
        this.snackBar.open('User added successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      });
  }

  /**
   * Opens a dialog to edit an existing user
   */
  onEditUserClicked(user: User): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '75%',
      data: user,
    });

    let updated: User;

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter((result) => result !== ''),
        switchMap((updatedUser) => {
          updated = updatedUser;
          return this.userService.updateUser(updatedUser);
        })
      )
      .subscribe((updateResult) => {
        if (updateResult) {
          this.users.update((users) =>
            users.map((u) => (u.uuid === updated.uuid ? updated : u))
          );
          this.snackBar.open('User updated successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        } else {
          this.snackBar.open('Error updating user.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      });
  }

  /**
   * Confirms and deletes a user
   */
  onDeleteUserClicked(user: User): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: {
        message: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter((result) => !!result),
        switchMap(() => {
          return this.userService.deleteUser(user);
        })
      )
      .subscribe((deleteResult) => {
        if (deleteResult) {
          this.users.set(this.users().filter((u) => u.uuid !== user.uuid));
          this.snackBar.open('Successfully deleted user!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        } else {
          this.snackBar.open('Error deleting user.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      });
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
