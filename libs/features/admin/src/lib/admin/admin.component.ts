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

  constructor() {}
}
