import { Component, inject, OnInit } from '@angular/core';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthenticationService } from '@emerald/authentication';
import { ApiEndpoint, ApiRoutes, User } from '@emerald/models';
import { BackendService } from '@emerald/services';
import { first } from 'rxjs';


@Component({
  selector: 'account-account',
  imports: [
    AccountDetailsComponent,
    ChangePasswordComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  standalone: true,
})
export class AccountComponent implements OnInit{
  private readonly authenticationService = inject(AuthenticationService);
  private readonly backendService = inject(BackendService);

  protected currentUser: User | undefined = undefined;

  ngOnInit() {
    const jwtInformation = this.authenticationService.getDecodedToken();

    if(jwtInformation) {
      this.backendService.doGet<User>(ApiRoutes.get(ApiEndpoint.User) + jwtInformation.sub).pipe(
        first()
      ).subscribe(user => {
        this.currentUser = user;
      })
    }
  }
}
