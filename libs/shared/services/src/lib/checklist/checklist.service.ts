import { inject, Injectable, Signal } from '@angular/core';
import { ApiEndpoint, ApiRoutes, Checklist } from '@emerald/models';
import { BackendService } from '../backend';
import { toSignal } from '@angular/core/rxjs-interop';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private readonly backendService = inject(BackendService);

  private readonly _checklists: Signal<Checklist[]>;

  get checklists() {
    return this._checklists;
  }

  constructor() {
    this._checklists = toSignal(
      this.backendService
        .doGet<Checklist[]>(ApiRoutes.get(ApiEndpoint.Checklist))
        .pipe(first()),
      { initialValue: [] }
    );
  }
}
