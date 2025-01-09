import { inject, Injectable } from '@angular/core';
import { BackendService } from '@emerald/services';
import { Observable } from 'rxjs';
import { ApiEndpoint, ApiRoutes, Review } from '@emerald/models';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly backendService = inject(BackendService);

  /**
   * Gets all reviews from the server
   */
  getReviews(): Observable<Review[]> {
    return this.backendService.doGet<Review[]>(ApiRoutes.get(ApiEndpoint.Review));
  }

  /**
   * Gets a review by uuid
   * @param reviewId the uuid of the review
   * @returns { Review } the review with the specified uuid
   */
  getReview(reviewId: string): Observable<Review> {
    return this.backendService.doGet<Review>(`${ApiRoutes.get(ApiEndpoint.Review)}/${reviewId}`);
  }
}
