import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { isMobile } from '@emerald/services';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

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
    RouterOutlet
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SidebarComponent {
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
