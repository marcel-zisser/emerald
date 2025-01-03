import { inject, Injectable } from '@angular/core';
import { BackendService } from '@emerald/services';
import {
  ApiEndpoint,
  ApiRoutes,
  Checklist,
  CreateChecklistRequest,
  CriteriaGroup,
} from '@emerald/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private readonly backendService = inject(BackendService);

  createChecklist(
    title: string,
    description: string,
    criteriaGroups: CriteriaGroup[],
    reviewerIds: string[]
  ): Observable<Checklist> {
    const request: CreateChecklistRequest = {
      title: title,
      description: description,
      criteriaGroups: criteriaGroups,
      reviewerIds: reviewerIds,
    };

    return this.backendService.doPost<Checklist, CreateChecklistRequest>(
      ApiRoutes.get(ApiEndpoint.Checklist),
      request
    );
  }
}
