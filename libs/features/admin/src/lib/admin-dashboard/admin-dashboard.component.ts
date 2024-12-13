import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, signal } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { isMobile, ScreenSizeService } from '@emerald/services';

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
  private readonly cdr = inject(ChangeDetectorRef);
  isExpanded = true;

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

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

}
