import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  inject,
  Renderer2,
  signal,
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
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ActivationEnd,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { SidebarService } from './sidebar.service';
import { MatLine } from '@angular/material/core';
import {
  Feature,
  FeatureRoutes,
  JwtTokenInformation,
  MenuItem,
} from '@emerald/models';
import { AuthenticationService } from '@emerald/authentication';
import { Title } from '@angular/platform-browser';
import { PagePipe } from './page.pipe';
import { filter, map, mergeMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { jwtDecode } from 'jwt-decode';

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
export class SidebarComponent implements AfterViewInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sidebarService = inject(SidebarService);
  private readonly authService = inject(AuthenticationService);
  private readonly titleService = inject(Title);
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly Feature = Feature;
  protected pageTitle = signal<string>(this.titleService.getTitle());
  protected isExpanded = true;
  protected upperMenuItems = this.sidebarService.menuItems;
  protected lowerMenuItems: MenuItem[] = [
    {
      icon: 'settings',
      label: Feature.Account,
      route: FeatureRoutes.get(Feature.Account) ?? '',
    },
  ];
  protected logoutItem: MenuItem = {
    icon: 'logout',
    label: Feature.Logout,
    route: '',
  };

  protected dashboardItem: MenuItem = {
    icon: 'dashboard',
    label: Feature.Dashboard,
    route: '',
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

    this.sidebarService.setMenuItems(
      jwtDecode<JwtTokenInformation>(this.authService.getToken() ?? '').role
    );

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.routerState.snapshot.root;
        const pageTitle = this.getTitleFromRoute(currentRoute);
        this.pageTitle.set(pageTitle);
      });
  }

  /**
   * Overwrites the default angular material CSS styles for the inner drawer container.
   * Angular material doesn't expose this, so we need to use this workaround.
   */
  ngAfterViewInit() {
    const drawerContainer = this.elementRef.nativeElement.querySelector(
      '.mat-drawer-inner-container'
    );
    if (drawerContainer) {
      this.renderer.setStyle(drawerContainer, 'display', 'flex');
      this.renderer.setStyle(drawerContainer, 'flex-direction', 'column');
    }
  }

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }

  logout(): void {
    this.authService.logout();
  }

  private getTitleFromRoute(route: ActivatedRouteSnapshot): string {
    if (route.firstChild) {
      return this.getTitleFromRoute(route.firstChild);
    }
    return route.title ?? 'Emerald';
  }
}
