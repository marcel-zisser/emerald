import { inject, Injectable } from '@angular/core';
import { BackendService } from '@emerald/services';
import {
  ApiEndpoint,
  ApiRoutes,
  Checklist,
  CreateChecklistRequest,
  CriteriaGroup,
} from '@emerald/models';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly backendService = inject(BackendService);

  getChecklist(checklistId: string): Observable<Checklist> {
    return this.backendService
      .doGet<Checklist>(
        `${ApiRoutes.get(ApiEndpoint.Checklist)}/${checklistId}`
      )
      .pipe(first());
  }

  createChecklist(
    title: string,
    description: string,
    dueDate: Date,
    criteriaGroups: CriteriaGroup[],
    reviewerIds: string[]
  ): Observable<Checklist> {
    const request: CreateChecklistRequest = {
      title: title,
      description: description,
      dueDate: dueDate,
      criteriaGroups: criteriaGroups,
      reviewerIds: reviewerIds,
    };

    return this.backendService.doPost<Checklist, CreateChecklistRequest>(
      ApiRoutes.get(ApiEndpoint.Checklist),
      request
    );
  }
}
