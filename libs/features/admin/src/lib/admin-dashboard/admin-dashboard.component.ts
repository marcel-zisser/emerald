import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'admin-dashboard',
  imports: [
    MatSidenavContainer,
    MatNavList,
    MatListItem,
    MatSidenavContent,
    MatSidenav,
    MatIcon,
    MatIconButton,
    NgOptimizedImage,
    RouterOutlet
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AdminDashboardComponent {
  isExpanded = true;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
