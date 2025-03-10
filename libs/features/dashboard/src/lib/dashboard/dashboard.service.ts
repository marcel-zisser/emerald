import { inject, Injectable, Signal } from '@angular/core';
import { BackendService } from '@emerald/services';
import { ApiEndpoint, ApiRoutes, Checklist } from '@emerald/models';
import { toSignal } from '@angular/core/rxjs-interop';
import { first } from 'rxjs';

@Injectable()
export class DashboardService {
  private readonly backendService = inject(BackendService);

  private _checklists: Signal<Checklist[]> | null = null;

  get checklists() {
    if (!this._checklists) {
      this._checklists = toSignal(
        this.backendService
          .doGet<Checklist[]>(ApiRoutes.get(ApiEndpoint.Dashboard))
          .pipe(first()),
        { initialValue: [] }
      );
    }

    return this._checklists;
  }
}
