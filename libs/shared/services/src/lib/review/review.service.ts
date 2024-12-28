import { inject, Injectable } from '@angular/core';
import { BackendService } from '../backend';
import { Observable } from 'rxjs';
import { ApiEndpoint, ApiRoutes, Review } from '@emerald/models';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly backendService = inject(BackendService)

  /**
   * Retrieves all reviews the current user
   */
  getReviews(): Observable<Review[]> {
    return this.backendService.doGet<Review[]>(`${ ApiRoutes.get(ApiEndpoint.Review) }`);
  }

  /**
   * Retrieves all reviews for a specific checklist
   * @param checklistId the uuid of the checklist
   */
  getReviewsByChecklistId(checklistId: string): Observable<Review[]> {
    return this.backendService.doGet<Review[]>(`${ ApiRoutes.get(ApiEndpoint.Review) }?checklistId=${checklistId}`);
  }
}
