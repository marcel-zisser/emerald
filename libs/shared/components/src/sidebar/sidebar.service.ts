import { inject, Injectable, signal } from '@angular/core';
import { Feature, FeatureRoutes, MenuItem, Roles } from '@emerald/models';
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
      route:
        FeatureRoutes.get(Feature.Admin) +
        '/' +
        FeatureRoutes.get(Feature.UserManagement),
    },
  ];

  private readonly projectOwnerMenuItems: MenuItem[] = [
    {
      icon: 'lists',
      label: Feature.MyProjects,
      route:
        FeatureRoutes.get(Feature.ProjectOwner) +
        '/' +
        FeatureRoutes.get(Feature.MyProjects),
    },
    {
      icon: 'edit',
      label: Feature.CreateProject,
      route:
        FeatureRoutes.get(Feature.ProjectOwner) +
        '/' +
        FeatureRoutes.get(Feature.CreateProject),
    },
  ];

  private readonly reviewerMenuItems: MenuItem[] = [
    {
      icon: 'tasks',
      label: Feature.AssignedProjects,
      route:
        FeatureRoutes.get(Feature.Reviewer) +
        '/' +
        FeatureRoutes.get(Feature.AssignedProjects),
    },
  ];

  get menuItems() {
    return this._menuItems.asReadonly();
  }

  /**
   * Sets the menu items of based on the user role
   * @param role the role of the user
   */
  setMenuItems(role: Roles): void {
    const menuItems = new Map<string, MenuItem[]>();

    switch (role) {
      case Roles.Admin:
        menuItems.set(Feature.Admin, this.adminMenuItems);
        menuItems.set(Feature.ProjectOwner, this.projectOwnerMenuItems);
        menuItems.set(Feature.Reviewer, this.reviewerMenuItems);
        break;
      case Roles.ProjectOwner:
        menuItems.set(Feature.ProjectOwner, this.projectOwnerMenuItems);
        menuItems.set(Feature.Reviewer, this.reviewerMenuItems);
        break;
      case Roles.Reviewer:
        menuItems.set(Feature.Reviewer, this.reviewerMenuItems);
        break;
    }

    this._menuItems.set(menuItems);
  }
}
