import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserTableComponent } from '../user-table';

@Component({
  selector: 'admin-dashboard',
  imports: [UserTableComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AdminDashboardComponent {}
