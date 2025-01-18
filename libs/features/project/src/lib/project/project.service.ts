import { inject, Injectable } from '@angular/core';
import { BackendService } from '@emerald/services';
import {
  ApiEndpoint,
  ApiRoutes,
  Checklist,
  CreateChecklistRequest,
  CriteriaGroup,
  Review,
} from '@emerald/models';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly backendService = inject(BackendService);

  /**
   * Returns Observable for the checklist with the given ID
   * @param checklistId the checklist ID
   * @returns {Observable<Checklist>} the observable returning the requested checklist
   */
  getChecklist(checklistId: string): Observable<Checklist> {
    return this.backendService
      .doGet<Checklist>(
        `${ApiRoutes.get(ApiEndpoint.Checklist)}/${checklistId}`
      )
      .pipe(first());
  }

  /**
   * Sends a request to create a new checklist
   * @param title the title of the checklist
   * @param description the description of the checklist
   * @param dueDate the due date of the checklist
   * @param criteriaGroups the criteriaGroups of the checklist
   * @param reviewerIds the user IDs of the assigned reviewers
   * @return {Observable<Checklist>} The created checklist object
   */
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

  /**
   * Gets the reviews for a given checklist ID
   * @param checklistId the checklist ID to retrieve the reviews from
   * @returns {Observable<Review[]>} The observable containing the list of reviews
   */
  getReviews(checklistId: string): Observable<Review[]> {
    return this.backendService
      .doGet<Review[]>(`${ApiRoutes.get(ApiEndpoint.Review)}?checklistId=${checklistId}`)
      .pipe(first());
  }
}
