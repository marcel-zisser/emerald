import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarService } from '@emerald/components';
import { Feature, FeatureRoutes, MenuItem } from '@emerald/models';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'admin-root',
  imports: [RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AdminComponent {
  private readonly sidebarService = inject(SidebarService);

  private adminMenuItems: MenuItem[] = [
    {
      icon: 'group',
      label: Feature.UserManagement,
      route:
        FeatureRoutes.get(Feature.Admin) +
        '/' +
        FeatureRoutes.get(Feature.UserManagement),
    },
  ];

  constructor() {
    this.sidebarService.setMenuItems(this.adminMenuItems);
    this.sidebarService.openRoute(this.adminMenuItems[0].route);
  }
}
