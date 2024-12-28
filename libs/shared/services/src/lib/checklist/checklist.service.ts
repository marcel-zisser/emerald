import { inject, Injectable, Signal } from '@angular/core';
import { ApiEndpoint, ApiRoutes, Checklist, DashboardChecklist, DashboardChecklistResponse } from '@emerald/models';
import { BackendService } from '../backend';
import { toSignal } from '@angular/core/rxjs-interop';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {

}
