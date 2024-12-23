import { Component, inject, signal } from '@angular/core';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthenticationService } from '@emerald/authentication';
import { ApiEndpoint, ApiRoutes, User } from '@emerald/models';
import { BackendService } from '@emerald/services';
import { first } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'account-account',
  imports: [AccountDetailsComponent, ChangePasswordComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  standalone: true,
})
export class AccountComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly backendService = inject(BackendService);

  protected currentUser;

  constructor() {
    const jwtInformation = this.authenticationService.getDecodedToken();

    if (jwtInformation) {
      this.currentUser = toSignal<User>(
        this.backendService
          .doGet<User>(ApiRoutes.get(ApiEndpoint.User) + jwtInformation.sub)
          .pipe(first()),
        { initialValue: undefined }
      );
    } else {
      this.currentUser = signal(undefined);
    }
  }
}
