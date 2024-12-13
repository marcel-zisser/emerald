import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@emerald/components';
import { ScreenSizeService } from '@emerald/services';
import { AuthenticationService } from '@emerald/authentication';

@Component({
  imports: [RouterModule, SidebarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  hostDirectives: [ScreenSizeService],
})
export class AppComponent {
  title = 'emerald-ui';

  private readonly authService = inject(AuthenticationService);

  protected isAuthenticated = this.authService.isAuthenticated;
}
