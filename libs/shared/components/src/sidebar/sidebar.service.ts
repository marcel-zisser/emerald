import { inject, Injectable, signal } from '@angular/core';
import { Feature, FeatureRoutes, MenuItem, Role } from '@emerald/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private readonly router = inject(Router);

  private _menuItems = signal<Map<string, MenuItem[]>>(new Map());

  private readonly adminMenuItems: MenuItem[] = [
    {
      icon: 'group',
      label: Feature.UserManagement,
      route: FeatureRoutes.get(Feature.UserManagement) ?? '',
    },
  ];

  private readonly projectOwnerMenuItems: MenuItem[] = [
    {
      icon: 'lists',
      label: Feature.Projects,
      route: FeatureRoutes.get(Feature.Projects)  ?? '',
    },
    {
      icon: 'edit',
      label: Feature.CreateProject,
      route:  FeatureRoutes.get(Feature.CreateProject)  ?? '',
    },
  ];

  private readonly reviewerMenuItems: MenuItem[] = [
    {
      icon: 'tasks',
      label: Feature.Reviews,
      route: FeatureRoutes.get(Feature.Reviews)  ?? '',
    },
  ];

  get menuItems() {
    return this._menuItems.asReadonly();
  }

  /**
   * Sets the menu items of based on the user role
   * @param role the role of the user
   */
  setMenuItems(role: Role): void {
    const menuItems = new Map<string, MenuItem[]>();

    switch (role) {
      case Role.Admin:
        menuItems.set(Feature.Admin, this.adminMenuItems);
        break;
      case Role.ProjectOwner:
        menuItems.set(Feature.ProjectOwner, this.projectOwnerMenuItems);
        menuItems.set(Feature.Reviewer, this.reviewerMenuItems);
        break;
      case Role.Reviewer:
        menuItems.set(Feature.Reviewer, this.reviewerMenuItems);
        break;
    }

    this._menuItems.set(menuItems);
  }
}
