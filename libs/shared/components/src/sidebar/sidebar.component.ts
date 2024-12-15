import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { isMobile } from '@emerald/services';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { MatLine } from '@angular/material/core';
import { Feature, FeatureRoutes, MenuItem } from '@emerald/models';
import { AuthenticationService } from '@emerald/authentication';
import { Title } from '@angular/platform-browser';
import { PagePipe } from './page.pipe';

@Component({
  selector: 'em-sidebar',
  imports: [
    MatSidenavContainer,
    MatNavList,
    MatListItem,
    MatSidenavContent,
    MatSidenav,
    MatIcon,
    MatIconButton,
    NgOptimizedImage,
    RouterOutlet,
    RouterLink,
    MatLine,
    PagePipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SidebarComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sidebarService = inject(SidebarService);
  private readonly authService = inject(AuthenticationService);
  private readonly titleService = inject(Title);

  protected pageTitle = this.titleService.getTitle();
  protected isExpanded = true;
  protected menuItems = this.sidebarService.menuItems;
  protected logoutItem: MenuItem = {
    icon: 'logout',
    label: Feature.Logout,
    route: FeatureRoutes.get(Feature.Logout) ?? '',
  };

  constructor() {
    effect(() => {
      if (this.isExpanded && isMobile()) {
        this.isExpanded = false;
      } else if (!this.isExpanded && !isMobile()) {
        this.isExpanded = true;
      }
      this.cdr.markForCheck();
    });
  }

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }

  logout(): void {
    this.authService.logout();
  }
}
