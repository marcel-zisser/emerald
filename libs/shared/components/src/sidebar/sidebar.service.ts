import { inject, Injectable, signal } from '@angular/core';
import { Feature, FeatureRoutes, MenuItem } from '@emerald/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly router = inject(Router);

  private _menuItems = signal<MenuItem[]>([]);

  get menuItems() {
    return this._menuItems.asReadonly();
  }

  setMenuItems(menuItems: MenuItem[]) {
    this._menuItems.set(menuItems);
  }

  addMenuItem(menuItem: MenuItem) {
    this._menuItems.update(menuItems => [...menuItems, menuItem]);
  }

  /**
   * Opens a given route via the router
   * @param route the desired route
   */
  public async openRoute(route: string | undefined): Promise<void> {
    if (route !== undefined && route !== null) {
      await this.router.navigate([route]);
    }
  }
}
