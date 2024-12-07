import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'admin-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AdminDashboardComponent {}
