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
}
